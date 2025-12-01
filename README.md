# 🥁 Tong-Tong Madura Hub

![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)

**Tong-Tong Madura Hub** adalah platform digital interaktif untuk melestarikan dan menjelajahi budaya Tong-Tong di Madura. Website ini menampilkan sejarah, instrumen, ritme, dan cerita di balik tradisi unik ini dengan cara yang ramah untuk generasi muda.

## 🌟 Fitur

- 🗺️ **Interactive Map**: Jelajahi tradisi Tong-Tong di 4 kabupaten Madura (Bangkalan, Sampang, Pamekasan, Sumenep)
- 📚 **Learning Materials**: Materi pembelajaran tentang sejarah, instrumen, ritme, dan fungsi sosial Tong-Tong
- 🎯 **Interactive Quizzes**: Uji pengetahuan Anda tentang budaya Tong-Tong
- 🎨 **Modern UI/UX**: Desain gelap yang modern dengan animasi halus
- 📱 **Fully Responsive**: Optimal di semua perangkat (desktop, tablet, mobile)
- ⚡ **Performance Optimized**: Lazy loading, code splitting, dan optimasi bundle
- ♿ **Accessibility**: ARIA labels, semantic HTML, dan keyboard navigation
- 🔍 **SEO Optimized**: Meta tags, Open Graph, sitemap, dan robots.txt

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) dengan App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Deployment**: GitHub Pages dengan static export
- **Compiler**: React Compiler untuk optimasi performa

## 📁 Project Structure

```
tongtong-madura/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── daerah/[slug]/     # Region detail pages
│   │   ├── materi/[slug]/     # Material detail pages
│   │   ├── quiz/[slug]/       # Quiz pages
│   │   ├── peta/              # Map page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading UI
│   │   ├── error.tsx          # Error handling
│   │   ├── not-found.tsx      # 404 page
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # Robots.txt
│   ├── components/            # React components
│   │   ├── Footer.tsx
│   │   ├── MapMadura.tsx
│   │   ├── MaterialCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── QuizCard.tsx
│   │   └── RegionCard.tsx
│   └── data/                  # Static data
│       ├── materials.ts       # Learning materials
│       ├── quizzes.ts        # Quiz questions
│       └── regions.ts        # Region information
├── public/                    # Static assets
│   └── madura-map.png
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Installation & Development

### Prerequisites

- Node.js 20.x atau lebih baru
- npm, yarn, pnpm, atau bun
- Firebase account (untuk admin dashboard)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/dans-real/tongtong-madura.git
   cd tongtong-madura
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase (Optional - untuk admin dashboard)**
   
   Buat file `.env.local` di root project:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build & Deployment

#### Option 1: Auto Deploy dengan GitHub Actions (Recommended)

1. **Setup GitHub Secrets**
   - Buka repository di GitHub → Settings → Secrets and variables → Actions
   - Tambahkan secrets berikut:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

2. **Enable GitHub Pages**
   - Buka Settings → Pages
   - Source: **GitHub Actions**

3. **Push ke main branch**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

   GitHub Actions akan otomatis build dan deploy ke: `https://dans-real.github.io/tongtong-madura`

#### Option 2: Manual Deploy

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Output akan ada di folder `out/`**

3. **Deploy ke GitHub Pages:**
   - Buka Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /docs (atau copy isi `out/` ke folder `docs/`)

Website akan tersedia di: `https://[username].github.io/tongtong-madura`

### Struktur Data Firebase

#### Collections:
- **gallery**: Foto-foto galeri
  ```typescript
  {
    imageUrl: string,
    title: string,
    caption: string,
    tags: string[],
    createdAt: timestamp
  }
  ```

- **explore**: Artikel konten explore
  ```typescript
  {
    title: string,
    informasi: string,
    referensi: string,
    imageUrl?: string,
    createdAt: timestamp
  }
  ```

- **quizzes**: Data quiz
  ```typescript
  {
    slug: string,
    title: string,
    level: 'basic' | 'medium' | 'advanced',
    description?: string,
    questions: [
      {
        question: string,
        options: [
          { text: string, isCorrect: boolean }
        ]
      }
    ],
    createdAt: timestamp
  }
  ```

## 🎨 Customization

### Warna Tema

Edit `tailwind.config.ts` untuk mengubah warna tema:

```typescript
colors: {
  maduraRed: "#b91c1c",    // Merah Madura
  maduraGold: "#fbbf24",   // Emas Madura
  maduraSoft: "#f97316",   // Orange lembut
}
```

### Menambah Konten

- **Material baru**: Edit `src/data/materials.ts`
- **Quiz baru**: Edit `src/data/quizzes.ts`
- **Region info**: Edit `src/data/regions.ts`

## 📊 Performance

Website ini dioptimasi untuk performa maksimal:

- ✅ Lazy loading untuk komponen non-critical
- ✅ Dynamic imports untuk code splitting
- ✅ Image optimization dengan Next.js Image
- ✅ Static Site Generation (SSG) untuk semua pages
- ✅ React Compiler untuk optimasi runtime

## ♿ Accessibility

- Semantic HTML5 tags
- ARIA labels untuk screen readers
- Keyboard navigation support
- Focus indicators yang jelas
- Contrast ratio yang memenuhi WCAG 2.1

## 🔍 SEO Features

- Dynamic metadata untuk setiap page
- Open Graph tags untuk social sharing
- Auto-generated sitemap.xml
- Robots.txt configuration
- Semantic HTML structure

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Project ini dibuat untuk tujuan edukasi dan pelestarian budaya.

## 👨‍💻 Author

**Dans Real**
- GitHub: [@dans-real](https://github.com/dans-real)

## 🙏 Acknowledgments

- Budaya Tong-Tong Madura yang kaya dan menginspirasi
- Next.js team untuk framework yang luar biasa
- Tailwind CSS untuk utility-first CSS framework
- Komunitas open source

---

**Made with ❤️ for preserving Madura's cultural heritage**
