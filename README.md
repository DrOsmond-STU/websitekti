# Website PT. Kita Teknologi Indonesia

Landing page resmi PT. Kita Teknologi Indonesia (KITA) — *your business partner in
consulting and information technology*. Dibangun sebagai situs statis (HTML, CSS,
JavaScript murni) sehingga mudah di-hosting di layanan shared hosting mana pun
tanpa proses build.

## Struktur Proyek

```
.
├── index.html              # Halaman utama (landing page satu halaman)
├── assets/
│   ├── css/style.css       # Seluruh styling (design tokens, layout, responsif)
│   ├── js/main.js          # Slider hero, navigasi, animasi scroll, form kontak
│   └── img/favicon.svg     # Favicon
└── README.md
```

## Konten & Sumber

Materi (sejarah perusahaan, nilai perusahaan, layanan, daftar tenaga ahli,
daftar klien, dan proyek) diambil dari dokumen *Company Profile PT. Kita
Teknologi Indonesia* pada Google Drive perusahaan.

## Fitur Halaman

- **Hero multi-slide** — 4 slide otomatis (auto-rotate) berisi highlight utama:
  profil perusahaan, pendampingan ISO 27001, IT Masterplan/SPBE, dan pelatihan
  kompetensi IT. Dilengkapi kontrol panah, indikator titik, dan jeda otomatis
  saat kursor berada di atas hero.
- **Statistik** — tahun berkarya, jumlah instansi yang didampingi, mitra
  pelatihan, dan tenaga ahli, dengan animasi angka berjalan saat discroll.
- **Tentang Kami** — sejarah berdirinya perusahaan serta empat nilai inti
  (Kebersamaan, Kejujuran, Amanat, Profesional).
- **Layanan** — enam kartu layanan: pelatihan IT, network & custom application,
  pendampingan ISO/SNI, IT Masterplan/Roadmap, dokumen SPBE, dan konsultasi.
- **Keahlian** — grid tenaga ahli perusahaan beserta gelar dan peran.
- **Klien & Proyek** — daftar klien pendampingan ISO 27001 dan mitra
  pelatihan (dapat difilter via tab), serta sorotan proyek unggulan.
- **Kontak** — informasi alamat, nomor Customer Service, peta lokasi (Google
  Maps embed), serta formulir kontak yang meneruskan pesan melalui aplikasi
  email pengunjung (mailto), plus tombol WhatsApp mengambang.

## Palet Warna

Palet dirancang khas dan berbeda dari kompetitor (mis. semestateknologiutama.com
yang bernuansa biru): kombinasi **teal/emerald tua** (`#082F29`–`#17AF91`) sebagai
warna utama dan **emas hangat** (`#D9A441`/`#E8BE6D`) sebagai aksen, di atas latar
krem lembut (`#FAF9F5`) — memberi kesan elegan, tepercaya, dan profesional tanpa
meniru identitas visual pesaing.

## Tipografi

- **Fraunces** (serif) untuk judul — memberi kesan elegan & personal.
- **Plus Jakarta Sans** (sans-serif) untuk teks isi — bersih dan mudah dibaca.

Keduanya dimuat via Google Fonts.

## Menjalankan Secara Lokal

Karena situs ini statis, cukup buka `index.html` langsung di browser, atau
jalankan server statis sederhana, misalnya:

```bash
python3 -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Deploy

Unggah seluruh isi folder ini (mempertahankan struktur `assets/`) ke direktori
publik hosting (misalnya `public_html` di cPanel/Domainesia). Tidak diperlukan
proses build maupun dependency Node.js.

## Kustomisasi Lanjutan

- **Ganti alamat email** pada `assets/js/main.js` (variabel `mailto`) dan
  `index.html` (link `mailto:` di footer) sesuai alamat resmi perusahaan.
- **Tambahkan logo asli** dengan mengganti `assets/img/favicon.svg` dan markup
  `.brand-mark` pada `index.html`.
- **Perbarui data klien/proyek/tenaga ahli** langsung pada bagian terkait di
  `index.html`.
