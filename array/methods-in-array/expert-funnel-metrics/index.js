/**
 * ADVANCED DATA AGGREGATION DASHBOARD (EXPERT)
 * * Kasus: Menyusun metrik performa penjualan produk berdasarkan data transaksi sukses.
 * Target:
 * 1. Mengeliminasi data transaksi yang gagal (status !== 'success').
 * 2. Mengelompokkan data berdasarkan nama produk (Grouping by Product).
 * 3. Melacak multi-metrik secara simultan: Akumulasi Omzet (totalRevenue) DAN Kuantitas Terjual (totalSold).
 */

const rawOrders = [
  { orderId: "O01", product: "E-book Keuangan", price: 15, status: "success" },
  { orderId: "O02", product: "Flashcard Hewan", price: 20, status: "success" },
  { orderId: "O03", product: "E-book Keuangan", price: 15, status: "failed" },  // <-- Gagal (Akan dibuang)
  { orderId: "O04", product: "Template Canva",  price: 25, status: "success" },
  { orderId: "O05", product: "Flashcard Hewan", price: 20, status: "success" },  
  { orderId: "O06", product: "Flashcard Hewan", price: 20, status: "success" }
];

// =========================================================================
// STEP 1: FILTERING (Pembersihan Data Mentah)
// =========================================================================
// Menyaring dan hanya meloloskan baris data yang berstatus 'success'.
const succesOrder = rawOrders.filter(order => order.status === 'success');


// =========================================================================
// STEP 2: MULTI-METRIC REDUCTION (Akumulasi Berjenjang)
// =========================================================================
const totalSuccess = succesOrder.reduce((total, order) => {
  // Menentukan properti 'product' sebagai kunci utama laci pengelompokan
  const key = order.product;
  
  // LOGIKA 1: Inisialisasi Objek Struktur (Jika Laci Belum Ada)
  // Ketika nama produk pertama kali dibaca, buatkan sub-objek berisi metrik awal bernilai 0
  if (!total[key]){
    total[key] = { totalRevenue: 0, totalSold: 0 };
  }

  // LOGIKA 2: Akumulasi Properti Spesifik (Menggunakan Dot Notation)
  // Tembak properti di dalam laci secara spesifik untuk dimanipulasi nilainya
  total[key].totalRevenue += order.price; // Menambahkan nominal harga ke total omzet
  total[key].totalSold += 1;              // Menambahkan nilai integer 1 ke total item terjual

  // LOGIKA 3: Pengembalian State accumulator
  // Wajib mengembalikan objek 'total' yang sudah diperbarui agar tidak kehilangan data di putaran berikutnya
  return total;
}, {}); // <-- Nilai awal berupa objek kosong ({}) sebagai wadah utama statistik


// =========================================================================
// STEP 3: DISPLAY METRICS
// =========================================================================
console.log("=== DASHBOARD METRIKS PRODUK (SUCCESS ONLY) ===");
console.log(totalSuccess);