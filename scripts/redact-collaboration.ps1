param(
    [string]$Root = (Split-Path $PSScriptRoot -Parent),
    [string]$PrivateSource = 'E:/AI-Workspace/Exports/Portfolio-Evidence/Collaboration/Originals'
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$plans = @(
    @{ Source = 'task-conversation.jpg'; Target = 'task-conversation-redacted.png'; Boxes = @(
        @(529, 5, 58, 38), @(647, 258, 143, 43), @(590, 603, 84, 41)
    ) },
    @{ Source = 'shared-board.jpg'; Target = 'shared-board-redacted.png'; Boxes = @(
        @(488, 416, 91, 47), @(488, 607, 91, 48), @(488, 833, 91, 51), @(488, 1048, 91, 50)
    ) }
)
foreach ($plan in $plans) {
    $path = Join-Path $PrivateSource $plan.Source
    $bitmap = [System.Drawing.Bitmap]::new($path)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        foreach ($box in $plan.Boxes) {
            for ($y = 0; $y -lt $box[3]; $y += 8) {
                for ($x = 0; $x -lt $box[2]; $x += 8) {
                    # Opaque synthetic tiles retain no pixels from the name underneath.
                    $shade = 142 + (([int]($x / 8) * 7 + [int]($y / 8) * 11) % 5) * 12
                    $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, $shade, $shade, $shade))
                    try { $graphics.FillRectangle($brush, $box[0] + $x, $box[1] + $y, [Math]::Min(8, $box[2] - $x), [Math]::Min(8, $box[3] - $y)) }
                    finally { $brush.Dispose() }
                }
            }
        }
        $bitmap.Save((Join-Path $Root ('assets/collaboration/' + $plan.Target)), [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Output $plan.Target
    }
    finally { $graphics.Dispose(); $bitmap.Dispose() }
}
