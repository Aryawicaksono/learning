/**
 * LANDING PAGE FUNNEL ANALYZER
 * * Kasus: Menganalisis performa konversi berdasarkan data sumber trafik (Traffic Source).
 * Target: 
 * 1. Mendapatkan daftar unik kanal marketing (Top of Funnel).
 * 2. Mengakumulasikan total pendapatan (Revenue) yang dihasilkan per kanal.
 */

const landingPageConversions = [
  { conversionId: "C01", source: "Instagram Reels", device: "Mobile", revenue: 15 },
  { conversionId: "C02", source: "WhatsApp Group", device: "Mobile", revenue: 10 },
  { conversionId: "C03", source: "Instagram Reels", device: "Mobile", revenue: 25 }, 
  { conversionId: "C04", source: "TikTok Ads", device: "Mobile", revenue: 30 },
  { conversionId: "C05", source: "WhatsApp Group", device: "Desktop", revenue: 15 } 
];

// =========================================================================
// STEP 1: MENCARI SUMBER TRAFIK UNIK (UNIQUE TRAFFIC SOURCES)
// =========================================================================

// 1a. Isolasi properti 'source' dari array objek menjadi array string mentah
const sources = landingPageConversions.map(page => page.source);

// 1b. Saring data duplikat dengan membandingkan indeks saat ini dan indeks pertama kali data ditemukan
const uniqueSources = sources.filter((source, index) => {
  // .indexOf() selalu mengembalikan indeks PERTAMA kali kata tersebut ditemukan.
  // Jika indeks pertama TIDAK SAMA dengan indeks saat ini, artinya data tersebut duplikat (ditendang).
  return sources.indexOf(source) === index;
});


// =========================================================================
// STEP 2: MENGELOMPOKKAN & MENJUMLAHKAN REVENUE PER SUMBER TRAFIK
// =========================================================================

const revenueSource = landingPageConversions.reduce((total, page) => {
  // Tentukan properti yang ingin dijadikan laci/kunci pengelompokan
  const key = page.source;
  
  // LOGIKA 1: Inisialisasi Laci Baru
  // Jika properti kanal tersebut belum ada di dalam objek 'total', buat baru dan set nilai awal ke 0
  if (!total[key]) {
     total[key] = 0;
  }
  
  // LOGIKA 2: Akumulasi Nilai
  // Tambahkan nilai revenue dari transaksi saat ini ke dalam laci yang sesuai
  total[key] += page.revenue;

  // LOGIKA 3: Wajib Return
  // Selalu kembalikan objek 'total' agar bisa digunakan pada putaran iterasi berikutnya
  return total;
}, {}); // <-- Nilai awal diatur sebagai objek kosong ({})


// =========================================================================
// STEP 3: TAMPILKAN OUTPUT DASHBOARD
// =========================================================================

console.log('=== DAFTAR SUMBER TRAFIK UNIK ===');
console.log(uniqueSources);

console.log('\n=== TOTAL REVENUE PER SUMBER TRAFIK ===');
console.log(revenueSource);