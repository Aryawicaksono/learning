/**
 * @typedef {Object} CustomerAnalytics
 * @property {number} totalSpent - Akumulasi total biaya yang dibelanjakan oleh pelanggan.
 * @property {Set<string>} uniqueCategory - Kumpulan kategori produk unik yang pernah dibeli pelanggan.
 */

/**
 * Membersihkan data transaksi mentah dan merangkum total belanja serta kategori produk unik per pelanggan.
 * * @param {Object[]} transactions - Array objek berisi data transaksi mentah dari server.
 * @param {string} transactions[].customerName - Nama pelanggan (masih terdapat spasi liar/huruf kapital berantakan).
 * @param {number} transactions[].price - Nominal harga dari transaksi produk.
 * @param {string} transactions[].productCategory - Kategori produk yang dibeli (masih berantakan).
 * * @returns {Map<string, CustomerAnalytics>} Map laporan akhir dengan KEY berupa nama pelanggan yang sudah bersih, 
 * dan VALUE berupa objek analisis belanja pelanggan (`CustomerAnalytics`).
 * * @example
 * const rawData = [{ customerName: "  ali brAhIm ", price: 500000, productCategory: " ElEctRonIcs " }];
 * const result = analyzeSalesData(rawData);
 * console.log(result.get('ali brahim')); // Mengembalikan: { totalSpent: 500000, uniqueCategory: Set { 'electronics' } }
 */
function analyzeSalesData(transactions) {
  // 1. Inisialisasi Map kosong yang akan menampung hasil analisis akhir
  //    Sesuai JSDoc @returns: Key berupa string (nama bersih), Value berupa objek CustomerAnalytics
  const analitycs = new Map();

  // 2. Mulai perulangan (loop) untuk membaca satu per satu objek transaksi dari array input
  //    Gunakan 'transactions' dari parameter fungsi agar dinamis dan konsisten
  for (const transaction of transactions) {
    
    // 3. TAHAP DATA CLEANSING (Pembersihan String)
    //    Memotong spasi di ujung (.trim) dan menyamakan ke huruf kecil (.toLowerCase)
    //    Ini menjamin data dengan nama berantakan akan berlabuh di KEY Map yang sama
    const name = transaction.customerName.trim().toLowerCase();
    const category = transaction.productCategory.trim().toLowerCase();
    
    // 4. Ambil nilai harga produk saat ini untuk diakumulasikan nanti
    const price = transaction.price;

    // 5. TAHAP AKUMULASI DATA (Logika Map & Set)
    //    Kondisi A: Jika nama pelanggan INI BELUM PERNAH terdaftar di dalam Map analisis
    if (!analitycs.has(name)) {
      
      // Buat struktur data awal baru untuk pelanggan tersebut ke dalam Map.
      // Sesuai JSDoc @property: totalSpent diisi angka, uniqueCategory diisi objek Set baru
      analitycs.set(name, {
        totalSpent: price,                  // Masukkan harga transaksi pertama sebagai saldo awal
        uniqueCategory: new Set([category]) // Buat Set baru dan langsung masukkan kategori produk pertama
      });
      
    } 
    // Kondisi B: Jika nama pelanggan INI SUDAH PERNAH terdaftar sebelumnya (Terjadi duplikasi data)
    else {
      
      // Ambil objek referensi data lama milik pelanggan tersebut dari dalam Map
      const existingData = analitycs.get(name);

      // Tambahkan (akumulasikan) harga transaksi baru ini ke total belanjaan yang lama
      existingData.totalSpent += price;
      
      // Tambahkan kategori produk baru ini ke dalam Set yang sudah ada.
      // Sesuai sifat objek Set, jika kategori ini sudah pernah dibeli, otomatis akan diabaikan (tidak duplikat)
      existingData.uniqueCategory.add(category);
    }
  }

  // 6. Kembalikan Map analisis yang sudah matang dan bersih ke luar fungsi
  return analitycs;
}