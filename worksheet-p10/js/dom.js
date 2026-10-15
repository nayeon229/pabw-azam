const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");
const form = document.querySelector("#form-jersey");
const inputNama = document.querySelector("#nama");
const inputTim = document.querySelector("#tim");
const inputTahun = document.querySelector("#tahun");
const tombolKirim = document.querySelector("#tombol-kirim");
const galatNama = document.querySelector("#galat-nama");
const galatTim = document.querySelector("#galat-tim");
const galatTahun = document.querySelector("#galat-tahun");

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

function buatKartuGaleri(proyek) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const gambar = document.createElement("img");
  gambar.src = "gambar_bola.webp";
  gambar.alt = `Jersey ${proyek.judul}`;

  const isi = document.createElement("div");
  isi.className = "kartu__isi";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = proyek.judul;

  const keterangan = document.createElement("p");
  keterangan.textContent = `${proyek.jenis} · ${proyek.tahun}`;

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";

  const nomor = document.createElement("span");
  nomor.textContent = `Nomor ${proyek.nomor}`;

  const tautan = document.createElement("a");
  tautan.href = "#koleksi";
  tautan.textContent = "Lihat";

  kaki.append(nomor, tautan);
  isi.append(judul, keterangan, kaki);
  kartu.append(gambar, isi);
  return kartu;
}

function renderTabel(daftar) {
  const tbody = document.querySelector("#koleksi tbody");
  tbody.textContent = "";

  daftar.forEach((proyek) => {
    const baris = document.createElement("tr");

    const tahun = document.createElement("th");
    tahun.scope = "row";
    tahun.textContent = proyek.tahun;

    const jenis = document.createElement("td");
    jenis.textContent = proyek.jenis;

    const judul = document.createElement("td");
    judul.textContent = proyek.judul;

    const nomor = document.createElement("td");
    nomor.textContent = proyek.nomor;

    baris.append(tahun, jenis, judul, nomor);
    tbody.append(baris);
  });
}

export function render(daftar) {
  wadah.textContent = "";
  pesanKosong.hidden = true;

  if (daftar.length === 0) {
    pesanKosong.textContent = "Belum ada jersey untuk kategori ini.";
    pesanKosong.hidden = false;
  } else {
    daftar.forEach((proyek) => wadah.append(buatKartu(proyek)));
  }

  const galeri = document.querySelector(".galeri");
  galeri.textContent = "";
  daftar.forEach((proyek) => galeri.append(buatKartuGaleri(proyek)));
  renderTabel(daftar);
}

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  wadah.textContent = "";
  document.querySelector(".galeri").textContent = "";
  document.querySelector("#koleksi tbody").textContent = "";
  pesanKosong.textContent = pesan;
  pesanKosong.hidden = false;
}

export function pasangFilter(daftar) {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !barisFilter.contains(tombol)) return;

    const kategori = tombol.dataset.kategori;
    const hasilFilter = daftar.filter((proyek) =>
      kategori === "semua" || proyek.jenis === kategori
    );

    document.querySelectorAll("#filter button").forEach((item) => {
      const aktif = item === tombol;
      item.classList.toggle("aktif", aktif);
      item.setAttribute("aria-pressed", String(aktif));
    });

    render(hasilFilter);
  });
}

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
