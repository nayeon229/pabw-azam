import { ambilProyek } from './api.js';
import { render, pasangFilter, aturMemuat, tampilkanGalat } from './dom.js';

const profil = {
  nama: "Ahmad Azam Albar",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 1,
  alamat: {
    kota: "Sukabumi"
  }
};

const daftarKeahlian = profil.keahlian.map((nama) => ({ nama }));
const jumlahProyek = profil.jumlahProyek ?? 0;
const kotaProfil = profil.alamat?.kota ?? "Belum diisi";

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");
const kalimatPerkenalan = buatPerkenalan(profil);
const keahlianTeks = formatKeahlian(profil.keahlian);

console.log(kalimatPerkenalan);
console.log(keahlianTeks);
console.log("Jumlah proyek:", jumlahProyek);
console.log("Kota profil:", kotaProfil);
console.table(daftarKeahlian);

const judulHalaman = document.querySelector("title");
const judulProfil = document.querySelector("header h1");
const teksBeranda = document.querySelector("#beranda figcaption");
const teksTentang = document.querySelector("#tentang p");
const footer = document.querySelector("footer p");

judulHalaman.textContent = `Koleksi Jersey Bola ${profil.nama}`;
judulProfil.textContent = `Koleksi Jersey Bola ${profil.nama}`;
teksBeranda.textContent = `${kalimatPerkenalan}. Saya memiliki ${jumlahProyek} koleksi jersey dan sedang belajar ${keahlianTeks}.`;
teksTentang.textContent = `Halaman untuk mencatat koleksi jersey bola ${profil.nama}.`;
footer.textContent = `${profil.nama} · ${profil.peran} · 2026`;

async function muat() {
  aturMemuat(true);

  try {
    const daftar = await ambilProyek();
    pasangFilter(daftar);
    render(daftar);
    console.table(daftar);
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.');
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

muat();
