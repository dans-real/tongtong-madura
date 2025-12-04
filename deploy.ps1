# Deploy script for GitHub Pages with custom domain
# This script builds the Next.js app and prepares it for GitHub Pages

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Step 1: Clean previous builds
Write-Host "`n📦 Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
if (Test-Path "docs") { Remove-Item -Recurse -Force "docs" }

# Step 2: Build the Next.js app
Write-Host "`n🔨 Building Next.js app..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors above." -ForegroundColor Red
    exit 1
}

# Step 3: Copy output to docs folder
Write-Host "`n📁 Copying build to docs folder..." -ForegroundColor Yellow
Copy-Item -Path "out" -Destination "docs" -Recurse

# Step 4: Create CNAME file (REPLACE with your actual domain)
Write-Host "`n🌐 Creating CNAME file..." -ForegroundColor Yellow
$customDomain = Read-Host "Enter your custom domain (e.g., tongtong-madura.com) or press Enter to skip"

if ($customDomain) {
    Set-Content -Path "docs/CNAME" -Value $customDomain
    Write-Host "✅ CNAME file created with domain: $customDomain" -ForegroundColor Green
} else {
    Write-Host "⚠️  CNAME file not created. Add it manually if using custom domain." -ForegroundColor Yellow
}

# Step 5: Verify critical files exist
Write-Host "`n✅ Verifying build..." -ForegroundColor Yellow
$criticalFiles = @(
    "docs/index.html",
    "docs/_next/static/chunks"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file missing!" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Build complete! Ready to deploy." -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. git add docs/" -ForegroundColor White
Write-Host "2. git commit -m 'Deploy to GitHub Pages'" -ForegroundColor White
Write-Host "3. git push origin main" -ForegroundColor White
Write-Host "`n4. Go to GitHub Settings > Pages" -ForegroundColor White
Write-Host "5. Set source to: main branch / docs folder" -ForegroundColor White
Write-Host "6. Add your custom domain in GitHub Pages settings" -ForegroundColor White
