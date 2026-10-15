# P10 — Koleksi Jersey Bola

Proyek ini melanjutkan hasil P9. Data jersey dipindahkan ke `data/proyek.json`, pengambilan data berada di `js/api.js`, perakitan halaman berada di `js/app.js`, dan penggambaran serta filter berada di `js/dom.js`.

## Berkas baru dan perubahan

- `data/proyek.json`: data Barcelona, Real Madrid, Manchester United, dan Argentina, masing-masing dengan `id` unik.
- `js/api.js`: `ambilProyek()` memakai `fetch`, memeriksa `respons.ok`, membaca JSON, dan melempar kembali galat.
- `js/app.js`: memanggil `ambilProyek()` dengan `async/await`, `try/catch/finally`.
- `js/dom.js`: mengekspor `render`, `pasangFilter`, `aturMemuat`, dan `tampilkanGalat`.
- `profil.html`: hanya memuat `js/app.js` sebagai module dan memiliki pesan memuat.

## Menjalankan

Buka folder ini di VS Code dan jalankan `profil.html` menggunakan Live Server. Pada `js/api.js`, alamat data akhir memakai URL raw GitHub. Pastikan repositori `nayeon229/pabw-azam` publik, folder `worksheet-p10` sudah diunggah ke cabang `main`, dan file `data/proyek.json` ada di jalur tersebut. Jika belum diunggah, untuk pengujian lokal sementara ubah `ALAMAT` menjadi `'data/proyek.json'`; setelah folder diunggah, kembalikan ke URL raw GitHub.

## Pemeriksaan worksheet

Uji keadaan memuat, berhasil, gagal, dan kosong. Ambil bukti/screenshot sendiri dari halaman dan panel browser setelah menjalankan proyek; bukti tersebut tidak dibuat otomatis oleh berkas kode.

## Deklarasi AI

Saya memakai bantuan AI untuk memahami instruksi worksheet, menyusun pemisahan `api.js`, `app.js`, dan `dom.js`, serta memeriksa kode. Topik koleksi jersey dan data jersey berasal dari proyek P9 saya. Saya menjalankan dan memeriksa halaman sendiri sebelum mengumpulkan.
