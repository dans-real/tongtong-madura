# 🚨 Quick Fix - Production Issues

## Current Errors

### 1. ❌ OAuth Domain Not Authorized
```
Info: The current domain is not authorized for OAuth operations. 
Add your domain (dans-real.github.io) to the OAuth redirect domains list
```

### 2. ❌ CORS Error (Still Present)
```
Access to fetch at 'https://firebasestorage.googleapis.com/...' 
from origin 'https://dans-real.github.io' has been blocked by CORS policy
```

---

## 🔧 Fix #1: Add Authorized Domain (CRITICAL - 2 minutes)

### Via Firebase Console (Easiest)

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Select project: `tongtong-madura`

2. **Go to Authentication Settings**
   - Click **Authentication** (left sidebar)
   - Click **Settings** tab
   - Click **Authorized domains**

3. **Add GitHub Pages Domain**
   - Click **Add domain**
   - Enter: `dans-real.github.io`
   - Click **Add**

4. **Verify**
   - Should see both:
     - `localhost` (for development)
     - `dans-real.github.io` (for production)

**That's it! This fix is immediate.** ✅

---

## 🔧 Fix #2: Setup CORS for Firebase Storage (10 minutes)

CORS masih error karena belum di-apply ke Firebase Storage. Ada 2 cara:

### Method A: Via Google Cloud SDK (Recommended)

#### Step 1: Install Google Cloud SDK

**Windows:**
1. Download: https://cloud.google.com/sdk/docs/install
2. Run installer `GoogleCloudSDKInstaller.exe`
3. Follow installation wizard
4. **Restart terminal/PowerShell** setelah install

**Check Installation:**
```powershell
gcloud --version
```

Should show version info.

#### Step 2: Authenticate & Configure

```powershell
# Login to Google Cloud
gcloud auth login

# Browser akan terbuka, login dengan akun Firebase Anda

# Set project
gcloud config set project tongtong-madura

# Verify
gcloud config list
```

#### Step 3: Apply CORS Configuration

```powershell
# Navigate to project folder
cd d:\Programming\Web_Full_Stack\tongtong-madura

# Apply CORS (file cors.json sudah ada)
gsutil cors set cors.json gs://tongtong-madura.firebasestorage.app

# Verify
gsutil cors get gs://tongtong-madura.firebasestorage.app
```

**Expected Output:**
```json
[
  {
    "origin": ["https://dans-real.github.io", "http://localhost:3000"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin", "Content-Disposition"]
  }
]
```

✅ **CORS is now configured!**

---

### Method B: Via Firebase Console (Alternative - Manual)

Jika tidak bisa install Google Cloud SDK:

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Select project: `tongtong-madura`

2. **Go to Storage**
   - Click **Storage** (left sidebar)
   - Click **Files** tab

3. **Upload Test File**
   - Upload any image to test
   - Click on uploaded file
   - Click **Get download URL**

4. **Set Metadata** (untuk setiap file)
   - Click uploaded file → Click 3 dots menu → Edit metadata
   - Add custom metadata:
     - Key: `Access-Control-Allow-Origin`
     - Value: `*`
   - Click **Save**

⚠️ **Limitation:** Ini hanya untuk file individual, bukan bucket-wide. Method A lebih baik.

---

## ✅ Verification Steps

### After Fix #1 (Authorized Domain)

1. Open: https://dans-real.github.io/tongtong-madura/admin
2. Try to login
3. Should see Firebase login page (no warning in console)

### After Fix #2 (CORS)

1. Open: https://dans-real.github.io/tongtong-madura
2. Go to Gallery tab
3. Open browser console (F12)
4. Should **NOT** see CORS errors
5. Images should load properly
6. Download should work via fetch (not fallback)

---

## 🐛 Troubleshooting

### "gcloud: command not found"
**Solution:**
1. Restart PowerShell/Terminal
2. If still not working, add to PATH manually:
   - Search "Environment Variables" in Windows
   - Edit PATH
   - Add: `C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin`
3. Restart PowerShell

### "Permission denied" when applying CORS
**Solution:**
1. Pastikan sudah login: `gcloud auth login`
2. Pastikan project sudah di-set: `gcloud config set project tongtong-madura`
3. Pastikan akun memiliki owner/editor access di Firebase project

### CORS error masih muncul setelah apply
**Solution:**
1. Wait 5-10 minutes untuk propagation
2. Hard refresh browser: `Ctrl + Shift + R`
3. Clear browser cache
4. Try Incognito/Private mode
5. Verify CORS applied: `gsutil cors get gs://tongtong-madura.firebasestorage.app`

### Download masih buka tab baru instead of download
**Solution:**
- Ini normal behavior untuk fallback
- Setelah CORS fixed, akan otomatis pakai fetch method
- Check console, should not see CORS error
- If CORS fixed tapi masih fallback → clear cache

---

## 📋 Quick Checklist

### Immediate (Do Now - 2 minutes)
- [ ] Add `dans-real.github.io` to Firebase Authorized Domains
- [ ] Test login di production

### Important (Do ASAP - 10 minutes)
- [ ] Install Google Cloud SDK
- [ ] Apply CORS configuration
- [ ] Verify CORS applied
- [ ] Test image loading
- [ ] Test download functionality

### Verification (After Fixes)
- [ ] No OAuth warning in console
- [ ] No CORS errors in console
- [ ] Images load properly
- [ ] Download works (not opening new tab)
- [ ] Admin login works

---

## 🎯 Expected Behavior After Fixes

### ✅ Working Features
- Gallery images load without CORS errors
- Download saves file directly (not opening tab)
- Admin login works without OAuth warnings
- No console errors
- All functionality smooth

### Current Status (Before Fixes)
- ⚠️ OAuth warning (doesn't break functionality)
- ❌ CORS error (breaks fetch, uses fallback)
- ⚠️ Download opens tab instead of direct download
- ✅ Images still display (via direct URL)

---

## 💡 Why These Errors Happen

### OAuth Domain Error
- Firebase Authentication requires whitelisting domains
- Prevents unauthorized domains from using your Firebase
- Security feature - good thing!
- **Impact:** Login might not work on production without this

### CORS Error
- Browser security prevents cross-origin requests
- Firebase Storage needs explicit permission for your domain
- **Impact:** Fetch API fails, falls back to window.open()
- Images still work, but download UX not optimal

---

## 🔗 Useful Links

- **Firebase Console:** https://console.firebase.google.com/
- **Google Cloud SDK:** https://cloud.google.com/sdk/docs/install
- **CORS Documentation:** https://cloud.google.com/storage/docs/configuring-cors
- **Firebase Auth Domains:** https://firebase.google.com/docs/auth/web/redirect-best-practices

---

## 🆘 Need Help?

If stuck, check:
1. Firebase Console → Usage & Billing (ensure project active)
2. Browser Console for specific error messages
3. Network tab in DevTools (check actual requests)
4. Firebase Authentication logs

---

**Priority:** Fix #1 is CRITICAL (2 min), Fix #2 is IMPORTANT (10 min)

**Time to fix both:** ~12 minutes total

Let me know jika butuh bantuan! 🚀
