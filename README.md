# Bizim Hekayəmiz — Rəqəmsal Hədiyyə Saytı

Sevgilin üçün hazırlanmış, tam frontend (backend-siz), React + Vite əsaslı interaktiv hədiyyə saytı.

## 1. Layihə Strukturu

```
love-gift/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── images/        ← öz şəkillərinizi bura qoyun
│   └── audio/         ← fon musiqisi (mp3) bura
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── memories.js       ← BÜTÜN MƏTN/TARİX/ŞƏKİL MƏLUMATLARI BURADADIR
    ├── hooks/
    │   └── useCountdown.js   ← sayğac məntiqi (həm irəli, həm geri sayır)
    └── components/
        ├── Hero.jsx           (1) Giriş, sayğac, konfeti, uçan ürəklər
        ├── Counter.jsx        canlı "bərabər keçən vaxt" sayğacı
        ├── FloatingHearts.jsx klik edildikdə uçan ürək effekti
        ├── MusicPlayer.jsx    vinil-stil musiqi düyməsi
        ├── StoryMap.jsx       (2) interaktiv xəritə + xatirə modalı
        ├── Timeline.jsx       (3) scroll ilə açılan zaman tüneli
        ├── Scrapbook.jsx      (4) flipbook-stil rəqəmsal albom
        ├── SecretQuiz.jsx     (5a) gizli sual → hidden məzmun
        ├── RandomMemory.jsx   (5b) təsadüfi xatirə generatoru
        ├── CountdownLock.jsx  (6) müəyyən tarixə qədər kilidli məktub
        └── SectionHeading.jsx bütün bölmələr üçün ortaq başlıq
```

## 2. Quraşdırma

Kompüterinizdə Node.js (v18 və ya yuxarı) quraşdırılmış olmalıdır.

```bash
# 1. Layihə qovluğuna keçin
cd love-gift

# 2. Bütün kitabxanaları quraşdırın
npm install

# 3. Development serverini işə salın
npm run dev
```

Terminalda göstərilən linkə (adətən `http://localhost:5173`) daxil olun.

Production build üçün:

```bash
npm run build
npm run preview
```

## 3. Öz Məzmununuzu Necə Əlavə Etmək Olar

Saytın **bütün mətn, tarix, koordinat və şəkil məlumatları** tək bir yerdə —
`src/data/memories.js` faylındadır. Kod ilə işləmək lazım deyil, sadəcə bu
faylı açıb dəyərləri dəyişmək kifayətdir:

- `coupleInfo.relationshipStart` → tanışlıq tarixiniz (canlı sayğac elə buradan işə düşür)
- `mapPins` → xəritədəki xüsusi məkanlarınız (lat/lng koordinatlarını Google Maps-dən "sağ klik → Nə var burada?" ilə tapa bilərsiniz)
- `timelineEvents` → zaman tünelindəki anlar
- `scrapbookPages` → flipbook albomundakı səhifələr
- `secretQuiz` → gizli sual, qəbul edilən cavablar və açılan sürpriz
- `randomMemoryPool` → "Təsadüfi Xatirə" düyməsinin göstərəcəyi anlar hovuzu
- `lockedSurprise.unlockDate` → kilidli məktubun açılacağı tarix

Şəkillərinizi `public/images/` qovluğuna atın və `memories.js`-dəki
`image: '/images/...'` yollarını öz fayl adlarınızla əvəz edin. Fon musiqisi
üçün mp3 faylını `public/audio/our-song.mp3` olaraq yerləşdirin (və ya
`backgroundMusic.src`-i dəyişin).

## 4. İstifadə Olunan Kitabxanalar

| Kitabxana | Məqsəd |
|---|---|
| `framer-motion` | Bütün animasiyalar, scroll-reveal, keçidlər |
| `canvas-confetti` | Konfeti effektləri (Hero və Quiz bölmələri) |
| `lucide-react` | İkonlar |
| `react-leaflet` + `leaflet` | İnteraktiv xəritə (OpenStreetMap, ödənişsiz, API key tələb etmir) |
| `react-pageflip` | Rəqəmsal albomun səhifə-çevirmə effekti |

## 5. Dizayn Sistemi

- **Rənglər:** krem fon (`#FBF3EE`), çəhrayı blush (`#F3C9C6`), qızılgül rose (`#C5788A`), tünd bənövşəyi plum (mətn), sage yaşılı və qızılı gold aksentlər.
- **Şriftlər:** başlıqlar üçün *Cormorant Garamond* (zərif serif), əsas mətn üçün *Outfit* (təmiz sans-serif), əl yazısı qeydlər üçün *Caveat*.
- Bütün bölmələr mobil ekranlara tam uyğunlaşdırılıb və `prefers-reduced-motion` dəstəklənir.

Xoş hədiyyə! 💌
