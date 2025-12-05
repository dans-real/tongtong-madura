# Deploy script for GitHub Pages with custom domain
# This script builds the Next.js app and prepares it for GitHub Pages

Write-Host "Starting deployment process..." -ForegroundColor Cyan

# Step 1: Clean previous builds
Write-Host "`nCleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
if (Test-Path "docs") { Remove-Item -Recurse -Force "docs" }

# Step 2: Build the Next.js app
Write-Host "`nBuilding Next.js app..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors above." -ForegroundColor Red
    exit 1
}

# Step 3: Copy output to docs folder
Write-Host "`nCopying build to docs folder..." -ForegroundColor Yellow
Copy-Item -Path "out" -Destination "docs" -Recurse

# Step 4: Check CNAME file
Write-Host "`nChecking CNAME file..." -ForegroundColor Yellow
if (Test-Path "docs/CNAME") {
    $existingDomain = Get-Content "docs/CNAME"
    Write-Host "CNAME file exists with domain: $existingDomain" -ForegroundColor Green
} else {
    Write-Host "CNAME file not found. Creating..." -ForegroundColor Yellow
    Set-Content -Path "docs/CNAME" -Value "tongtongmadura.web.id"
    Write-Host "CNAME file created with domain: tongtongmadura.web.id" -ForegroundColor Green
}

# Step 5: Verify critical files exist
Write-Host "`nVerifying build..." -ForegroundColor Yellow
$criticalFiles = @(
    "docs/index.html",
    "docs/_next/static/chunks"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   OK: $file exists" -ForegroundColor Green
    } else {
        Write-Host "   ERROR: $file missing!" -ForegroundColor Red
    }
}

Write-Host "`nBuild complete! Ready to deploy." -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. git add ." -ForegroundColor White
Write-Host "2. git commit -m 'Deploy to GitHub Pages'" -ForegroundColor White
Write-Host "3. git push origin main" -ForegroundColor White
Write-Host "`n4. Go to GitHub Settings > Pages" -ForegroundColor White
Write-Host "5. Set source to: main branch / docs folder" -ForegroundColor White
Write-Host "6. Add your custom domain in GitHub Pages settings" -ForegroundColor White
