const bukuKey = "Dicoding_booksApss";
let bukuList = [];

document.addEventListener("DOMContentLoaded", () => {
  loadBukuFromStorage();
  document.getElementById("form-buku").addEventListener("submit", tambahBuku);
  document.getElementById("btn-search").addEventListener("click", cariBuku);
});

function loadBukuFromStorage() {
  const bukuData = localStorage.getItem(bukuKey);
  if (bukuData) {
    bukuList = JSON.parse(bukuData);
    renderBuku();
  }
}

function simpanBukuToStorage() {
  localStorage.setItem(bukuKey, JSON.stringify(bukuList));
}

function tambahBuku(event) {
  event.preventDefault();

  const judul = document.getElementById("judul").value;
  const penulis = document.getElementById("penulis").value;
  const tahun = document.getElementById("tahun").value;
  const selesai = document.getElementById("selesai").checked;

  const buku = {
    id: +new Date(),
    title: judul,
    author: penulis,
    year: parseInt(tahun),
    isComplete: selesai,
  };

  bukuList.push(buku);
  simpanBukuToStorage();
  renderBuku();
}

function renderBuku() {
  const belumDibaca = document.getElementById("belum-dibaca");
  const selesaiDibaca = document.getElementById("selesai-dibaca");

  belumDibaca.innerHTML = "";
  selesaiDibaca.innerHTML = "";

  for (const buku of bukuList) {
    const bukuElement = buatElemenBuku(buku);
    if (buku.isComplete) {
      selesaiDibaca.append(bukuElement);
    } else {
      belumDibaca.append(bukuElement);
    }
  }
}

function buatElemenBuku(buku) {
  const bukuContainer = document.createElement("div");
  bukuContainer.classList.add("book-item");

  const judul = document.createElement("h3");
  judul.innerText = buku.title;
  const penulis = document.createElement("p");
  penulis.innerText = `Penulis: ${buku.author}`;
  const tahun = document.createElement("p");
  tahun.innerText = `Tahun: ${buku.year}`;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-value");

  const btnSelesai = document.createElement("button");
  btnSelesai.classList.add("primary");
  btnSelesai.innerText = buku.isComplete
    ? "Belum Selesai Dibaca"
    : "Selesai Dibaca";
  btnSelesai.addEventListener("click", () => pindahRakBuku(buku.id));

  const btnHapus = document.createElement("button");
  btnHapus.classList.add("danger");
  btnHapus.innerText = "Hapus Buku";
  btnHapus.addEventListener("click", () => hapusBuku(buku.id));

  btnContainer.append(btnSelesai, btnHapus);
  bukuContainer.append(judul, penulis, tahun, btnContainer);

  return bukuContainer;
}

function pindahRakBuku(bukuId) {
  const buku = bukuList.find((b) => b.id === bukuId);
  if (buku) {
    buku.isComplete = !buku.isComplete;
    simpanBukuToStorage();
    renderBuku();
  }
}

function hapusBuku(bukuId) {
  bukuList = bukuList.filter((b) => b.id !== bukuId);
  simpanBukuToStorage();
  renderBuku();
}

function cariBuku() {
  const judulSearch = document
    .getElementById("judulSearch")
    .value.toLowerCase();
  const hasilPencarian = bukuList.filter((b) =>
    b.title.toLowerCase().includes(judulSearch)
  );

  const belumDibaca = document.getElementById("belum-dibaca");
  const selesaiDibaca = document.getElementById("selesai-dibaca");

  belumDibaca.innerHTML = "";
  selesaiDibaca.innerHTML = "";

  for (const buku of hasilPencarian) {
    const bukuElement = buatElemenBuku(buku);
    if (buku.isComplete) {
      selesaiDibaca.append(bukuElement);
    } else {
      belumDibaca.append(bukuElement);
    }
  }
}
