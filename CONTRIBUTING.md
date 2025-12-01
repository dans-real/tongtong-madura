# Contributing Guide

Terima kasih atas minat Anda untuk berkontribusi pada Tong-Tong Madura Hub! 🎉

## Cara Kontribusi

### 1. Fork & Clone
```bash
# Fork repository via GitHub
git clone https://github.com/YOUR_USERNAME/tongtong-madura.git
cd tongtong-madura
npm install
```

### 2. Buat Branch Baru
```bash
git checkout -b feature/nama-fitur-anda
# atau
git checkout -b fix/nama-bug-yang-diperbaiki
```

### 3. Development
```bash
npm run dev
```

### 4. Testing
- Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- Test di berbagai device size (mobile, tablet, desktop)
- Pastikan tidak ada error di console
- Check accessibility dengan Lighthouse

### 5. Commit Changes
```bash
git add .
git commit -m "feat: deskripsi perubahan yang jelas"
```

**Commit Message Format:**
- `feat:` untuk fitur baru
- `fix:` untuk bug fix
- `docs:` untuk dokumentasi
- `style:` untuk formatting, whitespace
- `refactor:` untuk code refactoring
- `perf:` untuk performance improvement
- `test:` untuk testing
- `chore:` untuk maintenance tasks

### 6. Push & Create PR
```bash
git push origin feature/nama-fitur-anda
```

Kemudian buat Pull Request di GitHub dengan deskripsi yang jelas.

## Coding Standards

### TypeScript
- Gunakan TypeScript untuk semua file baru
- Define types yang jelas
- Avoid `any` type

### React Components
- Prefer functional components
- Use TypeScript untuk props
- Keep components small dan focused
- Extract reusable logic ke hooks

### CSS/Tailwind
- Gunakan Tailwind utility classes
- Follow naming convention yang consistent
- Avoid inline styles kecuali necessary
- Use custom colors dari config

### File Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── data/            # Static data (JSON-like)
├── lib/             # Utilities, helpers, constants
└── types/           # TypeScript type definitions
```

## Area Kontribusi

### Content
- [ ] Tambah materi pembelajaran baru
- [ ] Tambah quiz questions
- [ ] Update informasi region
- [ ] Translate ke bahasa lain

### Features
- [ ] Audio player untuk rhythm samples
- [ ] Video embeds untuk demonstrations
- [ ] User authentication & progress tracking
- [ ] Social sharing features
- [ ] Search functionality

### Technical
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] SEO enhancements
- [ ] Testing coverage
- [ ] Documentation

### Design
- [ ] UI/UX improvements
- [ ] Animation enhancements
- [ ] Dark/light mode toggle
- [ ] Custom illustrations

## Code Review Process

1. Automated checks harus pass (jika ada CI/CD)
2. Code review oleh maintainer
3. Request changes jika diperlukan
4. Approved & merged

## Questions?

Jangan ragu untuk:
- Open GitHub Issue
- Comment di PR yang ada
- Contact maintainer

## Code of Conduct

- Be respectful dan inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

---

**Terima kasih telah berkontribusi! 🙏**
