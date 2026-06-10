/**
 * DIGITAL MARKETING FUNNEL ANALYZER (BASIC)
 * * Kasus: Mengolah data mentah riwayat transaksi penjualan produk digital dari Scalev.
 * Alur Kerja:
 * 1. Filter  -> Menyaring data transaksi yang berhasil (status: success).
 * 2. Map     -> Mengonversi data objek menjadi string log penjualan siap pakai.
 * 3. Reduce  -> Mengakumulasikan total omzet/pendapatan dari penjualan yang sukses.
 */

const rawTransactions = [
  { orderId: "TX001", buyer: "Rian", product: "E-book Micro-Habits", price: 12, status: "pending" },
  { orderId: "TX002", buyer: "Siti", product: "Template Canva Premium", price: 25, status: "success" },
  { orderId: "TX003", buyer: "Andi", product: "E-book 5 Menit Sehari", price: 10, status: "success" },
  { orderId: "TX004", buyer: "Dewi", product: "Flashcard Alphabet", price: 15, status: "failed" },
  { orderId: "TX005", buyer: "Budi", product: "Template Canva Premium", price: 25, status: "success" }
];

// =========================================================================
// STEP 1: FILTERING (Menyaring Data)
// =========================================================================
// Mengambil data transaksi yang memiliki status tepat sama dengan 'success'.
// Sifat: Menyempitkan ukuran array tanpa mengubah struktur objek di dalamnya.
const successTransactions = rawTransactions.filter(transaction => transaction.status === 'success');


// =========================================================================
// STEP 2: MAPPING (Transformasi Bentuk)
// =========================================================================
// Mengubah susunan objek transaksi sukses menjadi sebuah array string naratif.
// Tanda kutip literal ('') ditambahkan manual di dalam template literals agar 
// string log memiliki pembungkus visual saat dicetak.
const salesLog = successTransactions.map(transaction => `'${transaction.buyer} membeli ${transaction.product}'`);


// =========================================================================
// STEP 3: REDUCING (Akumulasi Nilai)
// =========================================================================
// Memeras data harga (price) dari transaksi sukses menjadi satu nilai angka tunggal.
// Nilai awal (initial value) diset ke angka 0 sebagai titik awal perhitungan matematika.
const totalRevenue = successTransactions.reduce((total, item) => total + item.price, 0);


// =========================================================================
// STEP 4: OUTPUT LOGGING
// =========================================================================
console.log('=== Log Penjualan Sukses ===');
console.log(salesLog); // Mencetak array berisi string log naratif
console.log(`Total Pendapatan Sukses: $${totalRevenue}`); // Mencetak string interpolasi total omzet