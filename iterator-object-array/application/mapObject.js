"use strict";

/**
 * @fileoverview Dokumentasi Penghitung Pesan Masuk per Pengguna.
 * @description Menggunakan Array.prototype.reduce dan Map untuk mengagregasi
 * total pesan yang dikirim oleh setiap userId secara efisien.
 */

/**
 * Representasi data pesan mentah dari sistem chat.
 * @type {Array<{userId: number, text: string, status: string}>}
 */
const rawMessage = [
  { userId: 101, text: 'Halo, mau tanya harga', status: 'unread' },
  { userId: 102, text: 'P',                     status: 'unread' },
  { userId: 101, text: 'Bisa kirim hari ini?',  status: 'unread' },
];

/**
 * Mengurangi (reduce) array pesan menjadi sebuah Map yang berisi
 * pasangan Key-Value berupa [userId, total_pesan].
 * * @type {Map<number, number>}
 * @returns {Map} Map yang berisi userId sebagai key dan jumlah pesan sebagai value.
 */
const totalMessages = rawMessage.reduce((setMap, message) => {
  // Mengambil userId sebagai kunci unik untuk Map
  const key = message.userId;

  /**
   * Pengecekan Eksistensi Kunci:
   * Memeriksa apakah `userId` belum terdaftar di dalam Map.
   * Jika belum, inisialisasi kunci tersebut dengan nilai awal 0.
   */
  if (!setMap.has(key)) {
    setMap.set(key, 0);
  }
  
  /**
   * Akumulasi Nilai:
   * Mengambil jumlah pesan saat ini dengan `setMap.get(key)`.
   * Menggunakan operator `|| 0` sebagai fallback keamanan (jika bernilai falsy/undefined),
   * kemudian menambahkan nilainya dengan 1 dan menyimpannya kembali ke dalam Map.
   */
  setMap.set(key, (setMap.get(key) || 0) + 1);
  
  // Mengembalikan instance Map yang telah diperbarui untuk iterasi berikutnya
  return setMap;
}, new Map());

// === OUTPUT VERIFIKASI ===
console.log('===== TOTAL MESSAGE =====');
console.log(totalMessages);
// Output yang dihasilkan: Map(2) { 101 => 2, 102 => 1 }