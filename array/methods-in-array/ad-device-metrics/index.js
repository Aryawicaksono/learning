/**
 * PAID TRAFFIC PERFORMANCE ANALYZER (EXPERT LEVEL)
 * * Kasus: Menganalisis efisiensi biaya iklan Instagram Reels berdasarkan perangkat (Device).
 * Target:
 * 1. Filter -> Menyaring dan hanya mengambil data klik iklan yang sukses menghasilkan penjualan (status: converted).
 * 2. Reduce -> Mengelompokkan data berdasarkan perangkat (Mobile/Desktop) sekaligus menghitung 
 * dua metrik utama: Total Biaya Iklan (totalCost) DAN Jumlah Konversi (totalConversion).
 */

const adClicks = [
  { clickId: "C01", device: "Mobile", cost: 2, status: "converted" },
  { clickId: "C02", device: "Desktop", cost: 5, status: "converted" },
  { clickId: "C03", device: "Mobile", cost: 2, status: "ignored" },   // <-- Tidak konversi (Akan dibuang)
  { clickId: "C04", device: "Mobile", cost: 3, status: "converted" }, 
  { clickId: "C05", device: "Desktop", cost: 4, status: "converted" }  
];

// =========================================================================
// PROSES METHOD CHAINING (FILTER + REDUCE OBJEK)
// =========================================================================
const converted = adClicks
  // 1. TAHAP FILTER: Meloloskan data yang sukses konversi saja
  .filter(adClick => adClick.status === 'converted')
  
  // 2. TAHAP REDUCE: Mengubah hasil filter menjadi objek metrik berlapis
  .reduce((total, adclick) => {
    // Tentukan properti 'device' sebagai kunci utama laci pengelompokan
    const key = adclick.device;
    
    // LOGIKA A: Inisialisasi Laci Baru (Jika Belum Pernah Ada)
    // Menggunakan tanda seru (!) untuk mengecek status falsy (apakah total[key] masih undefined).
    // Jika belum ada, buatkan sub-objek baru dengan template metrik bernilai awal 0.
    if (!total[key]){
      total[key] = { totalCost: 0, totalConversion: 0 };
    }
    
    // LOGIKA B: Akumulasi Multi-Metrik Berlapis
    // Menggunakan kombinasi bracket notation [key] dan dot notation (.) untuk menyasar properti spesifik.
    total[key].totalCost += adclick.cost;      // Menambahkan nominal ad spend (biaya iklan)
    total[key].totalConversion += 1;           // Menambahkan jumlah hitungan konversi (+1 per baris data)

    // LOGIKA C: Wajib Return Accumulator
    // Mengembalikan objek 'total' yang sudah diperbarui agar bisa dipakai pada putaran data berikutnya.
    return total;
  }, {}); // <-- Nilai awal berupa objek kosong ({}) sebagai wadah utama dashboard statistik


// =========================================================================
// OUTPUT DASHBOARD PERFORMA IKLAN
// =========================================================================
console.log('=== DASHBOARD PERFORMA AD DEVICE (CONVERTED ONLY) ===');
console.log(converted);