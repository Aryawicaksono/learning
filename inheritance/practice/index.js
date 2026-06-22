/**
 * =========================================================================
 * DOKUMENTASI EKSPERIMEN: EKSPLORASI PROPERTI .constructor PADA PROTOTYPE
 * =========================================================================
 * * TUJUAN:
 * Memahami bagaimana properti `.constructor` disimpan di dalam Prototype
 * dan bagaimana objek anak (instance) dapat memanggil ulang mesin cetaknya
 * melalui lintasan bertingkat (Prototype Chain Lookup).
 */

// -------------------------------------------------------------------------
// 1. DEFINISI KONSTRUKTOR UTAMA (THE BASE BLUEPRINT)
// -------------------------------------------------------------------------

/**
 * Fungsi Konstruktor untuk membuat objek Animals.
 * @param {string} name - Nama dari hewan yang dibuat.
 */
function Animals(name) {
  this.name = name; // Properti ini akan menempel langsung di instance masing-masing
}

/**
 * Menambahkan method ke dalam objek Prototype milik Animals.
 * Semua hewan yang dibuat dari cetakan ini akan saling berbagi (share) fungsi ini,
 * sehingga menghemat penggunaan memori komputer.
 */
Animals.prototype.jump = function() {
  console.log('I\'m jumping');
};


// -------------------------------------------------------------------------
// 2. EKSPERIMEN 1: INSTANSIASI VIA PROTOTYPE PROPERTY (INDIRECT INSTANTIATION)
// -------------------------------------------------------------------------

/**
 * Cara Kerja:
 * Kita tidak memanggil `new Animals('tiger')` secara langsung. 
 * Melainkan, kita berjalan memutar: 
 * Animals -> pergi ke gudang prototipenya (.prototype) -> ambil akte acuan (.constructor)
 * * Karena secara bawaan `Animals.prototype.constructor` merujuk kembali ke fungsi 
 * `Animals` itu sendiri, maka sintaks di bawah ini sah dan berjalan normal.
 */
const tiger = new Animals.prototype.constructor('tiger');

console.log(tiger); 
// OUTPUT: Animals { name: 'tiger' }
// PENJELASAN: Objek 'tiger' berhasil lahir sebagai anak kandung sah dari cetakan Animals.


// -------------------------------------------------------------------------
// 3. EKSPERIMEN 2: INSTANSIASI VIA INSTANCE PROPERTY (DYNAMIC INSTANTIATION)
// -------------------------------------------------------------------------

/**
 * Cara Kerja (Mencetak Objek Baru dari Objek yang Sudah Ada):
 * Di sini kita memerintahkan: "Tolong buatkan objek 'cat' menggunakan mesin cetak 
 * yang sama dengan yang melahirkan objek 'tiger'."
 * * Proses di Belakang Layar (Prototype Chain Lookup):
 * 1. JavaScript memeriksa apakah objek `tiger` punya properti `.constructor` secara mandiri? (Tidak ada).
 * 2. JavaScript terpaksa naik satu tingkat mencari ke prototipenya, yaitu `Animals.prototype`.
 * 3. Di `Animals.prototype`, JavaScript menemukan properti `.constructor` yang mengarah ke fungsi `Animals`.
 * 4. Akhirnya, perintah dieksekusi sebagai `new Animals('cat')`.
 */
const cat = new tiger.constructor('cat');

console.log(cat); // (Catatan: Diperbaiki dari console.log('cat') agar menampilkan objeknya)
// OUTPUT: Animals { name: 'cat' }
// PENJELASAN: Objek 'cat' berhasil dibuat. Dia memiliki cetakan yang sama dengan tiger,
// sehingga cat juga bisa mengakses method cat.jump().


// -------------------------------------------------------------------------
// 4. KESIMPULAN & MANFAAT DI DUNIA NYATA
// -------------------------------------------------------------------------
/*
 * Trik `new objek.constructor()` ini sangat populer di kalangan Software Architect 
 * (khususnya saat membuat library atau framework di Silicon Valley). 
 * * Manfaatnya: 
 * Jika suatu hari fungsi Anda menerima sebuah objek acak dari luar, dan fungsi Anda 
 * tidak tahu/tidak punya akses langsung ke nama fungsi konstruktor aslinya (misal nama 
 * class-nya di-private atau di-obfuscate), fungsi Anda tetap bisa menggandakan atau 
 * membuat objek baru yang sejenis hanya dengan memanfaatkan celah `objek.constructor`.
 */
