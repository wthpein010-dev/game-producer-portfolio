$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
public static class RedactionPixelCheck {
  public static void Verify(string source, string target, int[][] boxes) {
    using (var original = new Bitmap(source)) using (var redacted = new Bitmap(target)) {
      if (original.Size != redacted.Size) throw new Exception("Image dimensions changed");
      for (int y=0; y<original.Height; y++) for (int x=0; x<original.Width; x++) {
        int[] mask = null;
        foreach (var b in boxes) if (x>=b[0] && x<b[0]+b[2] && y>=b[1] && y<b[1]+b[3]) {mask=b;break;}
        var pixel=redacted.GetPixel(x,y);
        if (mask == null) {
          if (pixel.ToArgb()!=original.GetPixel(x,y).ToArgb()) throw new Exception("Non-redacted pixels changed");
        } else {
          int shade=142+((((x-mask[0])/8)*7+((y-mask[1])/8)*11)%5)*12;
          if (pixel.A!=255 || pixel.R!=shade || pixel.G!=shade || pixel.B!=shade) throw new Exception("Mask retains source data");
        }
      }
    }
  }
}
'@
$root = Split-Path $PSScriptRoot -Parent
$private = 'E:/AI-Workspace/Exports/Portfolio-Evidence/Collaboration/Originals'
[RedactionPixelCheck]::Verify((Join-Path $private 'task-conversation.jpg'), (Join-Path $root 'assets/collaboration/task-conversation-redacted.png'), [int[][]]@(@(529,5,58,38),@(647,258,143,43),@(590,603,84,41)))
[RedactionPixelCheck]::Verify((Join-Path $private 'shared-board.jpg'), (Join-Path $root 'assets/collaboration/shared-board-redacted.png'), [int[][]]@(@(488,416,91,47),@(488,607,91,48),@(488,833,91,51),@(488,1048,91,50)))
Write-Output 'PASS opaque masks and unchanged non-personnel pixels'
