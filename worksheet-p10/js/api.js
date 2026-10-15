const ALAMAT = 'https://raw.githubusercontent.com/nayeon229/pabw-azam/main/worksheet-p10/data/proyek.json';

export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);

    if (!respons.ok) {
      throw new Error('status ' + respons.status);
    }

    return await respons.json();
  } catch (galat) {
    console.error('Gagal mengambil data proyek:', galat.message);
    throw galat;
  }
}
