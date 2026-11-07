"""Real file/codec regression tests for the checked-in image generation tool."""

import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

from PIL import Image, ImageCms, ImageDraw


SCRIPT = Path(__file__).resolve().parents[1] / "scripts/generate-image-variants.py"


class ImageVariantsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.assets = self.root / "assets"
        self.assets.mkdir()

    def source(self, name, size, mode="RGB", **options):
        destination = self.assets / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        picture = Image.new(mode, size, (250, 245, 240, 180) if mode == "RGBA" else "white")
        draw = ImageDraw.Draw(picture)
        draw.rectangle((0, 0, size[0] // 2, size[1] // 2), fill="black")
        draw.line((0, size[1] // 2, size[0] - 1, size[1] // 2), fill="red", width=2)
        picture.save(destination, **options)
        return destination

    def generate(self):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--root", str(self.root)],
            capture_output=True, text=True, check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        return json.loads((self.assets / "optimized/manifest.json").read_text(encoding="utf-8"))

    def test_widths_are_capped_and_keep_an_in_between_original_size(self):
        # Catches upscaling, a missing original width, and oversized previews.
        self.source("large.png", (2200, 1100), compress_level=0)
        self.source("middle.png", (620, 310), compress_level=0)
        self.source("small.png", (321, 123), compress_level=0)
        images = self.generate()["images"]
        self.assertEqual([v["width"] for v in images["assets/large.png"]["variants"]], [480, 960, 1440, 1920])
        self.assertEqual([v["height"] for v in images["assets/large.png"]["variants"]], [240, 480, 720, 960])
        self.assertEqual([v["width"] for v in images["assets/middle.png"]["variants"]], [480, 620])
        self.assertEqual([v["width"] for v in images["assets/small.png"]["variants"]], [321])

    def test_png_full_size_keeps_text_pixels_and_alpha_and_never_changes_original(self):
        # Catches accidental lossy encoding of diagrams and destructive conversion.
        source = self.source("diagram.png", (65, 35), "RGBA", compress_level=0)
        before = source.read_bytes()
        entry = self.generate()["images"]["assets/diagram.png"]
        self.assertEqual(source.read_bytes(), before)
        self.assertEqual(entry["sourceSha256"], hashlib.sha256(before).hexdigest())
        self.assertEqual((entry["width"], entry["height"], entry["bytes"]), (65, 35, len(before)))
        with Image.open(source) as original, Image.open(self.root / entry["variants"][0]["src"]) as preview:
            self.assertEqual(preview.mode, "RGBA")
            self.assertEqual(preview.tobytes(), original.tobytes())

    def test_every_raster_type_is_discovered_but_generated_files_are_excluded(self):
        # Catches omitted extensions, nested directories, and recursive derivatives.
        for name in ("a.PNG", "nested/b.jpg", "c.jpeg", "d.webp"):
            self.source(name, (500, 250))
        self.source("optimized/ignored.png", (600, 300))
        (self.assets / "icon.svg").write_text("<svg/>", encoding="utf-8")
        manifest = self.generate()
        self.assertEqual(manifest["version"], 1)
        self.assertEqual(list(manifest["images"]), ["assets/a.PNG", "assets/c.jpeg", "assets/d.webp", "assets/nested/b.jpg"])
        for entry in manifest["images"].values():
            for variant in entry["variants"]:
                artifact = self.root / variant["src"]
                self.assertEqual(artifact.stat().st_size, variant["bytes"])
                with Image.open(artifact) as decoded:
                    self.assertEqual(decoded.size, (variant["width"], variant["height"]))
                    self.assertEqual(decoded.format, "WEBP")

    def test_unchanged_inputs_produce_identical_output_bytes_and_changed_inputs_get_new_paths(self):
        # Catches timestamps, unstable ordering, filename collisions, and stale caches.
        self.source("a/repeated.png", (100, 50), compress_level=0)
        second = self.source("b/repeated.png", (100, 50), compress_level=0)
        manifest = self.generate()
        files = lambda: {p.relative_to(self.assets).as_posix(): p.read_bytes() for p in sorted((self.assets / "optimized").rglob("*")) if p.is_file()}
        first_output = files()
        self.generate()
        self.assertEqual(files(), first_output)
        first_src = manifest["images"]["assets/a/repeated.png"]["variants"][0]["src"]
        second_src = manifest["images"]["assets/b/repeated.png"]["variants"][0]["src"]
        self.assertNotEqual(first_src, second_src)
        with Image.open(second) as picture:
            picture.putpixel((99, 49), (13, 24, 35))
            picture.save(second, compress_level=0)
        changed = self.generate()["images"]["assets/b/repeated.png"]["variants"][0]["src"]
        self.assertNotEqual(changed, second_src)
        self.assertFalse((self.root / second_src).exists(), "stale generated files should not accumulate")

    def test_already_small_original_does_not_get_a_larger_same_size_derivative(self):
        # Catches replacing an efficient original with an inflated re-encoding.
        picture = Image.new("RGB", (8, 8), "white")
        picture.save(self.assets / "efficient.webp", lossless=True, method=6)
        entry = self.generate()["images"]["assets/efficient.webp"]
        self.assertEqual(entry["variants"], [])

    def test_color_profile_is_preserved_for_browser_color_management(self):
        # Catches color shifts caused by stripping an original ICC profile.
        profile = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()
        self.source("profiled.png", (200, 100), compress_level=0, icc_profile=profile)
        variant = self.generate()["images"]["assets/profiled.png"]["variants"][0]
        with Image.open(self.root / variant["src"]) as preview:
            self.assertEqual(preview.info.get("icc_profile"), profile)


if __name__ == "__main__":
    unittest.main()
