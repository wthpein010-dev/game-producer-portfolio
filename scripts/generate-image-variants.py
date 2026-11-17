#!/usr/bin/env python3
"""Regenerate checked-in WebP previews; the Node site build never runs this tool."""

import argparse
import hashlib
from io import BytesIO
import json
from pathlib import Path

from PIL import Image


WIDTHS = (480, 960, 1440, 1920)
RASTER_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def generate(root):
    assets = root / "assets"
    output = assets / "optimized"
    manifest_path = output / "manifest.json"
    previous = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"images": {}}
    images = {}
    kept_paths = set()
    for source in sorted(assets.rglob("*"), key=lambda item: item.as_posix()):
        if output in source.parents or source.suffix.lower() not in RASTER_EXTENSIONS or not source.is_file():
            continue
        source_bytes = source.read_bytes()
        source_hash = hashlib.sha256(source_bytes).hexdigest()
        source_path = source.relative_to(root).as_posix()
        with Image.open(BytesIO(source_bytes)) as original:
            # Keep browser color management while dropping incidental metadata.
            color_profile = original.info.get("icc_profile", b"")
            has_alpha = "A" in original.getbands() or "transparency" in original.info
            picture = original.convert("RGBA" if has_alpha else "RGB")
        width, height = picture.size
        entry = {"sourceSha256": source_hash, "width": width, "height": height, "bytes": len(source_bytes), "variants": []}
        target_widths = sorted({candidate for candidate in WIDTHS if candidate <= width} | {min(width, WIDTHS[-1])})
        for target_width in target_widths:
            target_height = max(1, round(height * target_width / width))
            resized = picture if target_width == width else picture.resize((target_width, target_height), Image.Resampling.LANCZOS)
            encoded = BytesIO()
            # Every PNG is conservative/lossless: diagrams and small UI text must
            # not pick up lossy codec artifacts. JPEG/WebP screenshots use q92.
            # In lossless mode quality controls encoding effort, not image loss.
            resized.save(encoded, format="WEBP", lossless=source.suffix.lower() == ".png", quality=80 if source.suffix.lower() == ".png" else 92, method=6, exact=True, alpha_quality=100, icc_profile=color_profile)
            data = encoded.getvalue()
            if len(data) >= len(source_bytes):
                continue
            relative_source = source.relative_to(assets)
            # Mirrored directories plus the original extension prevent collisions
            # between equally named assets. The content hash busts preview caches.
            filename = "{}{}-{}-{}.webp".format(source.stem, source.suffix.lower(), source_hash[:16], target_width)
            destination = output / relative_source.parent / filename
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)
            destination_path = destination.relative_to(root).as_posix()
            kept_paths.add(destination_path)
            entry["variants"].append({"src": destination_path, "width": target_width, "height": target_height, "bytes": len(data)})
        images[source_path] = entry

    # Only remove derivatives named by our prior manifest, and only below the
    # output directory. Originals and unrelated files cannot be cleanup targets.
    for entry in previous.get("images", {}).values():
        for variant in entry.get("variants", []):
            old_path = root / variant["src"]
            if variant["src"] not in kept_paths and output.resolve() in old_path.resolve().parents and old_path.is_file():
                old_path.unlink()

    output.mkdir(parents=True, exist_ok=True)
    manifest = {"version": 1, "images": images}
    temporary_manifest = manifest_path.with_suffix(".json.tmp")
    temporary_manifest.write_bytes((json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
    temporary_manifest.replace(manifest_path)
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1], help="repository root (defaults to this script's repository)")
    args = parser.parse_args()
    manifest = generate(args.root.resolve())
    entries = list(manifest["images"].values())
    variants = [variant for entry in entries for variant in entry["variants"]]
    print("Generated {} previews for {} originals ({} source bytes, {} preview bytes).".format(len(variants), len(entries), sum(entry["bytes"] for entry in entries), sum(variant["bytes"] for variant in variants)))


if __name__ == "__main__":
    main()
