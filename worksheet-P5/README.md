# P5 - Layout Modern: Flexbox dan Grid

Dasar: P4 `Koleksi Jersey Bola Saya`. Isi, warna, token, gambar, dan konsep mode gelap P4 dipertahankan. Penambahan hanya untuk memenuhi instruksi Worksheet P5.

## A. Kerangka
- `.page` memakai Grid dengan `grid-template-rows: auto 1fr auto` dan `min-height: 100dvh`.
- `.isi` memakai dua kolom: `16rem 1fr`.
- Navbar memakai Flex arah baris.
- Menu samping memakai Flex arah kolom.
- Galeri dan penempatan blok memakai Grid.

## B. layout.css
Potongan utama:
```css
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
}

.navbar {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

.isi {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: var(--space-6);
}
```

## C. komponen.css
Galeri menggunakan pola Worksheet:
```css
.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-4);
}
```
Kartu memakai Grid untuk tinggi minimum dan Flex pada isi/footer kartu.

## D. Penempatan
Area bernama digunakan:
```css
grid-template-areas:
  "sisi utama"
  "sisi bawah";

.sisi { grid-area: sisi; }
.utama { grid-area: utama; }
.bawah { grid-area: bawah; }
```

## E. Kasus sulit
- Tinggi kartu: `min-height: 14rem` dan `align-content: start`.
- Isi panjang: `.kartu__isi { min-width: 0; }`.
- Judul panjang: `.kartu__judul { overflow-wrap: anywhere; }`.
- Uji target: 360 px dan 1280 px.

## F. Pemeriksaan
### F.2
Potongan kode: `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));`
Dipakai pada: `.galeri` di `komponen.css`.

### F.3 Penilaian mandiri
- Kerangka halaman: 30/30 — Grid terbaca dan tiga baris utuh.
- Flexbox: 25/25 — navbar dan isi kartu memakai Flex serta gap.
- Grid: 30/30 — galeri adaptif dan area bernama dipakai.
- Kerapian: 15/15 — overflow ditangani pada lebar uji.
- Total: 100/100.

### F.4 Exit ticket
1. Bagian yang memakai flex: navbar, menu samping, form, dan isi/footer kartu karena anak-anaknya disusun dalam satu arah.
2. Bagian yang memakai grid: `.page`, `.isi`, dan `.galeri` karena perlu mengatur baris/kolom dan ruang yang tersedia.
3. Kasus meluber: judul kartu yang panjang; diperbaiki dengan `min-width: 0` dan `overflow-wrap: anywhere`.

### F.5 Catatan
Bagian yang paling sulit: menyesuaikan layout P4 dengan Grid/Flex tanpa membuat isi P4 hilang.
Bagian yang saya ingin dibahas di kelas: perbedaan penggunaan Grid dan Flex saat layout mulai berubah mengikuti lebar layar.
