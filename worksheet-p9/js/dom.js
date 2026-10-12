// Memilih elemen yang akan dipakai di halaman.
const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#kosong");
const form = document.querySelector("#form-jersey");
const inputNama = document.querySelector("#nama");
const inputTim = document.querySelector("#tim");
const inputTahun = document.querySelector("#tahun");
const tombolKirim = document.querySelector("#tombol-kirim");
const galatNama = document.querySelector("#galat-nama");
const galatTim = document.querySelector("#galat-tim");
const galatTahun = document.querySelector("#galat-tahun");

// Data diambil dari app.js P8. Salinan ini tidak mengubah array aslinya.
const salinanProyek = [...daftarProyek];

function buatKartu(proyek) {
  const kartu = document.createElement("li");
  kartu.className = "kartu-proyek";

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul;

  const jenis = document.createElement("p");
  jenis.textContent = `${proyek.jenis} · ${proyek.tahun}`;

  const nomor = document.createElement("p");
  nomor.textContent = `Nomor ${proyek.nomor}`;

  kartu.append(judul, jenis, nomor);
  return kartu;
}

function render(daftar) {
  wadah.textContent = "";

  if (daftar.length === 0) {
    pesanKosong.hidden = false;
    return;
  }

  pesanKosong.hidden = true;
  daftar.forEach((proyek) => {
    wadah.append(buatKartu(proyek));
  });
}

function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

// Satu pendengar di induk dipakai untuk semua tombol filter.
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol || !barisFilter.contains(tombol)) return;

  const kategori = tombol.dataset.kategori;
  const hasilFilter = salinanProyek.filter((proyek) =>
    kategori === "semua" || proyek.jenis === kategori
  );

  tandaiTombolAktif(tombol);
  render(hasilFilter);
});

let sudahMencobaKirim = false;

function periksaKolom(input, pesan, benar, teksGalat) {
  pesan.textContent = benar ? "" : teksGalat;
  input.setAttribute("aria-invalid", String(!benar));
  return benar;
}

function validasiForm() {
  const namaBenar = periksaKolom(
    inputNama,
    galatNama,
    inputNama.value.trim() !== "",
    "Isi nama jersey terlebih dahulu."
  );
  const timBenar = periksaKolom(
    inputTim,
    galatTim,
    inputTim.value.trim() !== "",
    "Isi nama tim terlebih dahulu."
  );
  const tahun = Number(inputTahun.value);
  const tahunBenar = periksaKolom(
    inputTahun,
    galatTahun,
    inputTahun.value.trim() !== "" && Number.isInteger(tahun) && tahun >= 1900 && tahun <= 2100,
    "Masukkan tahun antara 1900 dan 2100."
  );

  const semuaBenar = namaBenar && timBenar && tahunBenar;
  tombolKirim.disabled = sudahMencobaKirim && !semuaBenar;
  return semuaBenar;
}

[inputNama, inputTim, inputTahun].forEach((input) => {
  input.addEventListener("input", () => {
    if (sudahMencobaKirim) validasiForm();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sudahMencobaKirim = true;

  if (!validasiForm()) {
    const kolomSalah = form.querySelector('[aria-invalid="true"]');
    if (kolomSalah) kolomSalah.focus();
    return;
  }

  const pesanSuksesLama = form.querySelector(".pesan-sukses");
  if (pesanSuksesLama) pesanSuksesLama.remove();

  const pesanSukses = document.createElement("p");
  pesanSukses.className = "pesan-sukses";
  pesanSukses.textContent = "Isian sudah benar.";
  form.append(pesanSukses);
});

render(salinanProyek);
