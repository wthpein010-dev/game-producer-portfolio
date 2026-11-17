param([Parameter(Mandatory=$true)][string]$Ffmpeg)
$ErrorActionPreference='Stop'
$root=Split-Path $PSScriptRoot -Parent
$dest=Join-Path $root 'assets/project-design/sheep-match'
$video='C:/Users/ASUS/Desktop/20261117-154048.mp4'
$old='E:/AI-Workspace/Temp/codex-clipboard-4540284d-e44d-45be-9f6f-1f73e27437c7.gif'
$mask='crop=720:1350:0:210'
function Invoke-Media([string[]]$Arguments) {
    & $Ffmpeg @Arguments
    if($LASTEXITCODE -ne 0){throw 'Media preparation failed'}
}
Invoke-Media @('-hide_banner','-loglevel','error','-ss','35','-i',$video,'-t','60','-vf',$mask,'-an','-map_metadata','-1','-c:v','libx264','-preset','fast','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart','-y',(Join-Path $dest 'slot-playback-redacted.mp4'))
Invoke-Media @('-hide_banner','-loglevel','error','-i',$old,'-vf','drawbox=x=330:y=3:w=166:h=31:color=0x94a36e:t=fill','-an','-map_metadata','-1','-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart','-y',(Join-Path $dest 'legacy-playback-redacted.mp4'))
foreach($point in @(45,75,105,160,205)){
    Invoke-Media @('-hide_banner','-loglevel','error','-ss',"$point",'-i',$video,'-vf',$mask,'-frames:v','1','-update','1','-y',(Join-Path $dest "slot-frame-$point.jpg"))
}
Invoke-Media @('-hide_banner','-loglevel','error','-i',$old,'-vf','drawbox=x=330:y=3:w=166:h=31:color=0x94a36e:t=fill','-frames:v','1','-update','1','-y',(Join-Path $dest 'legacy-playback-poster.jpg'))
Invoke-Media @('-hide_banner','-loglevel','error','-i','E:/AI-Workspace/Temp/codex-clipboard-2e2da86c-7d54-41ef-80b5-f5e326fced97.jpg','-vf','crop=1080:2250:0:90','-frames:v','1','-update','1','-y',(Join-Path $dest 'slot-board-redacted.png'))
Copy-Item -LiteralPath 'E:/AI-Workspace/Temp/codex-clipboard-5aefa2ce-964d-4745-9f49-2da63dbb3820.jpg' -Destination (Join-Path $dest 'vita-metrics-reference.jpg')
Copy-Item -LiteralPath 'E:/AI-Workspace/Temp/codex-clipboard-ccb2efb0-2082-4d2a-aba3-0e4594eccf24.png' -Destination (Join-Path $dest 'level-v-curve.png')
