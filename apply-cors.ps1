# Apply CORS to Firebase Storage
# Run this script after installing Google Cloud SDK

Write-Host "Step 1: Login to Google Cloud..." -ForegroundColor Yellow
gcloud auth login

Write-Host "`nStep 2: Set project..." -ForegroundColor Yellow
gcloud config set project tongtong-madura

Write-Host "`nStep 3: Apply CORS configuration..." -ForegroundColor Yellow
gsutil cors set cors.json gs://tongtong-madura.firebasestorage.app

Write-Host "`nStep 4: Verify CORS applied..." -ForegroundColor Yellow
gsutil cors get gs://tongtong-madura.firebasestorage.app

Write-Host "`nDone! CORS configuration applied successfully." -ForegroundColor Green
Write-Host "Refresh your website (Ctrl+Shift+R) to see the changes." -ForegroundColor Cyan
