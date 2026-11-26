$ErrorActionPreference = "Stop"

# Project directories
$Root = $PSScriptRoot
$Shared = Join-Path $Root "shared"
$Dist = Join-Path $Root "dist"

# Shared files
$Files = @(
    "background.js",
    "content.js",
    "page-bridge.js",
    "popup.js",
    "popup.html",
    "styles.css"
)

# Browser targets
$Browsers = @("chrome", "firefox")

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "     Smart Link Guard Builder"
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check shared directory
if (!(Test-Path $Shared)) {
    throw "Shared directory not found: $Shared"
}

# Check shared files
foreach ($File in $Files) {
    $Path = Join-Path $Shared $File

    if (!(Test-Path $Path)) {
        throw "Missing shared file: $File"
    }
}

# Build each browser
foreach ($Browser in $Browsers) {

    Write-Host "Building $Browser..." -ForegroundColor Yellow

    $Manifest = Join-Path $Root "$Browser\manifest.json"
    $Output = Join-Path $Dist $Browser

    # Check manifest
    if (!(Test-Path $Manifest)) {
        throw "Missing manifest: $Manifest"
    }

    # Create output directory
    New-Item -ItemType Directory -Force -Path $Output | Out-Null

    # Copy manifest
    Copy-Item $Manifest `
        (Join-Path $Output "manifest.json") -Force

    # Copy shared files
    foreach ($File in $Files) {

        Copy-Item `
            (Join-Path $Shared $File) `
            (Join-Path $Output $File) -Force
    }

    # Copy icons if available
    $Icons = Join-Path $Root "icons"

    if (Test-Path $Icons) {
        Copy-Item $Icons `
            (Join-Path $Output "icons") `
            -Recurse -Force
    }

    Write-Host "$Browser build completed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "       BUILD SUCCESSFUL"
Write-Host "==================================" -ForegroundColor Green

Write-Host ""
Write-Host "Chrome output:  dist\chrome"
Write-Host "Firefox output: dist\firefox"
Write-Host ""