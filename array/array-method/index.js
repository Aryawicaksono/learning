/**
 * MASTER CHEAT SHEET: JAVASCRIPT ARRAY METHODS
 * Karakteristik Utama:
 * - Immutable: Mengembalikan array/objek baru tanpa merusak data asli.
 * - Mutator/Destructive: Mengubah data asli yang ada di memori.
 */

// ==========================================
// 1. .map() [Kategori: Transformasi - Immutable]
// Kegunaan: Mengubah bentuk tiap elemen menjadi struktur baru dengan jumlah data tetap sama.
// ==========================================
const ebookProducts = [
  { id: 1, title: "5 Menit Sehari: Atur Keuangan", priceUSD: 10 },
  { id: 2, title: "Jangan Dibuang! Cuan dari Elektronik Rusak", priceUSD: 15 },
  { id: 3, title: "Template Canva Premium untuk Kreator", priceUSD: 25 }
];

// Menggunakan gaya modern (Implicit Return dengan tanda kurung `()`)
// Menghasilkan objek baru dengan properti priceIDR hasil konversi kurs
const convertedEbookProduct = ebookProducts.map(product => ({
  id: product.id,
  title: product.title,
  priceIDR: product.priceUSD * 15000,
}));

// console.log(convertedEbookProduct);


// DATA DATA MASTER UNTUK EKSPERIMEN BERIKUTNYA
const flashcardProducts = [
  { id: 101, series: "Pulang ke Rumah: Seri Gajah", price: 15, stock: 50 },
  { id: 102, series: "Pulang ke Rumah: Seri Jerapah (Premium Canvas)", price: 25, stock: 12 },
  { id: 103, series: "Pulang ke Rumah: Seri Satwa Air", price: 18, stock: 30 },
  { id: 104, series: "Pulang ke Rumah: Seri Burung Nusantara (Premium Gold)", price: 30, stock: 8 }
];

// ==========================================
// 2. .filter() [Kategori: Filtering - Immutable]
// Kegunaan: Menyaring elemen yang lolos kondisi (return true) ke dalam array baru.
// ==========================================
const premiumFlashcardProducts = flashcardProducts.filter(product => product.price > 20);

// console.log (premiumFlashcardProducts);


// ==========================================
// 3. .find() [Kategori: Searching - Immutable]
// Kegunaan: Mencari SATU elemen PERTAMA yang cocok. Mengembalikan objek langsung, bukan array.
// ==========================================
const targetProduct = flashcardProducts.find(product => product.id === 101);

// console.log(targetProduct);


// ==========================================
// 4. .reduce() [Kategori: Akumulasi - Immutable]
// Kegunaan: Memeras seluruh elemen array menjadi satu nilai tunggal (angka, teks, objek).
// Parameter: (accumulator/total, currentValue/dataSaatIni) -> diakhiri nilai awal (0)
// ==========================================
const totalPotentialRevenue = flashcardProducts.reduce((total, product) => total + (product.stock * product.price), 0);

// console.log(totalPotentialRevenue);


// ==========================================
// 5. .findIndex() & .toSpliced() [Kategori: Manipulasi Struktural]
// - .findIndex() [Immutable]: Mencari posisi indeks angka (0, 1, 2...) dari data yang cocok.
// - .toSpliced() [Immutable]: Versi modern dari .splice() untuk menghapus/mengubah data secara aman.
// ==========================================
const waitingList = [
  { id: 1, name: "Arya" },
  { id: 2, name: "Budi" },
  { id: 3, name: "Wicaksono" }
];

// Mendapatkan indeks posisi Budi (hasilnya: 1)
const budiIndex = waitingList.findIndex(person => person.name === 'Budi');

// Menghapus 1 data pada posisi budiIndex, menghasilkan array baru tanpa merusak waitingList asal
const updatedWaitingList = waitingList.toSpliced(budiIndex, 1);

// console.log(updatedWaitingList)


// ==========================================
// 6. .some() & .every() [Kategori: Validasi Logika - Boolean]
// - .some(): Mengembalikan true jika MINIMAL ADA SATU elemen memenuhi syarat.
// - .every(): Mengembalikan true jika SELURUH elemen tanpa kecuali memenuhi syarat.
// ==========================================
const cartItems = [
  { id: 1, name: "Template Canva Premium", price: 25, stock: 10 },
  { id: 2, name: "E-book Micro-Habits", price: 12, stock: 5 },
  { id: 3, name: "Flashcard Alphabet", price: 15, stock: 0 } 
];

const isPrice = cartItems.some(item => item.price > 20);    // true, karena ada item seharga 25
const isStockSafe = cartItems.every(item => item.stock !== 0); // false, karena ada item dengan stock 0

// console.log(`Apakah ada produk di atas $20? ${isPrice}
// Apakah semua produk stoknya aman? ${isStockSafe}`);


// ==========================================
// 7. .includes() & .join() [Kategori: Utility - String & Array]
// - .includes(): Cek apakah nilai primitif ada di array (true/false).
// - .join(): Merangkai seluruh array menjadi teks string tunggal menggunakan separator.
// ==========================================
const instagramTags = ["digitalproduct", "microhabits", "financialeducation", "creativetoys"];

const isTagFinancial = instagramTags.includes("financialeducation"); // true
const stringTags = instagramTags.join(' '); // Menggabungkan tagar dipisahkan oleh karakter spasi

console.log(`Apakah ada tag financial? ${isTagFinancial}
Hasil untuk caption: ${stringTags}`);