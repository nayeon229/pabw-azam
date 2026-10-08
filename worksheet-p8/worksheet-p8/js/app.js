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

const daftarProyek = [
  { judul: "Barcelona", tahun: 2025, nomor: 10, jenis: "Home Jersey", selesai: true },
  { judul: "Real Madrid", tahun: 2024, nomor: 7, jenis: "Home Jersey", selesai: true },
  { judul: "Manchester United", tahun: 2023, nomor: 7, jenis: "Home Jersey", selesai: true },
  { judul: "Argentina", tahun: 2022, nomor: 10, jenis: "Home Jersey", selesai: true }
];

const jumlahProyek = profil.jumlahProyek ?? 0;
const kotaProfil = profil.alamat?.kota ?? "Belum diisi";
let pilihanAktif = "semua";

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
console.table(daftarProyek);

const selesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(selesai);

const katalog = daftarProyek.find((proyek) => proyek.judul === "Real Madrid");
console.log(katalog);

const dataKartu = daftarProyek.map((proyek) => ({
  judul: proyek.judul,
  keterangan: `${proyek.jenis} · ${proyek.tahun}`,
  nomor: `Nomor ${proyek.nomor}`
}));
console.table(dataKartu);

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

const galeri = document.querySelector(".galeri");
galeri.innerHTML = dataKartu.map((proyek) => `
  <article class="kartu">
    <img src="gambar_bola.webp" alt="Jersey ${proyek.judul}">
    <div class="kartu__isi">
      <h3 class="kartu__judul">${proyek.judul}</h3>
      <p>${proyek.keterangan}</p>
      <div class="kartu__kaki"><span>${proyek.nomor}</span><a href="#koleksi">Lihat</a></div>
    </div>
  </article>
`).join("");

const tbody = document.querySelector("#koleksi tbody");
tbody.innerHTML = daftarProyek.map((proyek) => `
  <tr>
    <th scope="row">${proyek.tahun}</th>
    <td>${proyek.jenis}</td>
    <td>${proyek.judul}</td>
    <td>${proyek.nomor}</td>
  </tr>
`).join("");
