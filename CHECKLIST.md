# ✅ Pre-Deployment Checklist

Checklist cepat sebelum push ke GitHub Pages.

## 📦 Build Check

```bash
# Test build local
npm run build
```

**Expected output:**
- ✅ No TypeScript errors
- ✅ No build errors
- ✅ Output folder `out/` created
- ✅ File `.nojekyll` created in `out/`

## 🔧 Configuration Check

### 1. next.config.mjs
- [x] `output: "export"` enabled
- [x] `basePath: isProd ? "/tongtong-madura" : ""`
- [x] `assetPrefix: isProd ? "/tongtong-madura/" : ""`
- [x] `images.unoptimized: true`

### 2. .env.local (Local Development)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. GitHub Secrets (Production)
- [ ] All Firebase secrets added in repository settings
- [ ] Secrets match your Firebase project

### 4. GitHub Pages Settings
- [ ] Source: **GitHub Actions**
- [ ] Custom domain (optional): Configured if needed

### 5. Firebase Setup
- [ ] Authentication: Email/Password enabled
- [ ] Firestore: Database created
- [ ] Firestore Rules: Public read, auth write
- [ ] Storage: Enabled (Blaze plan)
- [ ] Storage Rules: Public read, auth write

## 🚀 Deployment Steps

### First Time Deployment

1. **Commit all changes**
   ```bash
   git add .
   git commit -m "Initial deployment setup"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Monitor GitHub Actions**
   - Go to repository → Actions tab
   - Watch "Deploy to GitHub Pages" workflow
   - Wait for green checkmark ✅

4. **Verify deployment**
   - Visit: `https://dans-real.github.io/tongtong-madura`
   - Check all pages load
   - Check navigation works
   - Test admin login

### Subsequent Deployments

```bash
# Make changes
git add .
git commit -m "feat: your changes"
git push origin main

# GitHub Actions will auto-deploy
```

## 🧪 Testing Checklist

### Public Pages
- [ ] Homepage loads
- [ ] Map displays correctly
- [ ] Navigation works
- [ ] Links use correct basePath
- [ ] Images load
- [ ] Responsive on mobile

### Admin Dashboard
- [ ] `/admin` accessible
- [ ] Login works
- [ ] Gallery CRUD works
- [ ] Explore CRUD works
- [ ] Quiz CRUD works
- [ ] Image upload works

### Performance
- [ ] Fast initial load
- [ ] Smooth navigation
- [ ] No console errors
- [ ] Lighthouse score > 90

## 🐛 Common Issues

### Build fails with "Module not found"
**Fix:** Clear cache and rebuild
```bash
rm -rf .next node_modules
npm install
npm run build
```

### 404 on GitHub Pages
**Fix:** Wait 5-10 minutes for propagation, or check basePath config

### Images not loading
**Fix:** Ensure `unoptimized: true` in next.config.mjs

### Admin can't login
**Fix:** Check Firebase Auth is enabled and credentials are correct

### Upload fails
**Fix:** Ensure Firebase Storage enabled and Blaze plan active

## 📝 Final Notes

- Always test build locally before pushing
- Monitor GitHub Actions for build status
- Check Firebase Console for any errors
- Keep `.env.local` secure (never commit it)

---

**Ready to deploy? Run:** `npm run build` **then push!** 🚀
