$PrintOnly = $false
if ($args -contains "-PrintOnly") {
  $PrintOnly = $true
}

$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

$port = 4173
while (Test-NetConnection -ComputerName 127.0.0.1 -Port $port -InformationLevel Quiet) {
  $port += 1
}

$ip = Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object {
    $_.IPAddress -notlike "127.*" -and
    $_.IPAddress -notlike "169.254.*" -and
    $_.PrefixOrigin -ne "WellKnown"
  } |
  Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
  throw "Could not detect this PC's LAN IP address. Check Wi-Fi/LAN connection."
}

$url = "http://${ip}:$port/"

Write-Host ""
Write-Host "Pixel Art Editor iPhone URL:" -ForegroundColor Cyan
Write-Host $url -ForegroundColor Green
Write-Host "Direct file URL:"
Write-Host "http://${ip}:$port/pixel_art_editor.html" -ForegroundColor Green
Write-Host ""
Write-Host "1. Connect the PC and iPhone to the same home network/router."
Write-Host "   PC may use Ethernet. iPhone should use Wi-Fi on the same router."
Write-Host "2. Open the Safari app on iPhone. Do not use the Google app/search page."
Write-Host "3. Type the URL above directly into Safari's address bar."
Write-Host "4. If Google search results appear, you typed it into a search page, not Safari's address bar."
Write-Host "5. Press Ctrl + C here to stop the server."
Write-Host ""

if ($PrintOnly) {
  exit 0
}

python -m http.server $port --bind 0.0.0.0
