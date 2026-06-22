"use strict";

/**
 * @fileoverview Dokumentasi Pemrosesan Data Pendaftar Acara.
 * @description Menyaring pendaftar yang sudah membayar, mengekstrak email mereka, 
 * dan mengambil 2 data pertama sebagai daftar prioritas (wishList).
 */

/**
 * Daftar objek pendaftar yang berisi informasi nama, email, dan status pembayaran.
 * @type {Array<{name: string, email: string, paid: boolean}>}
 */
const registrants = [
  { name: "Siti", email: "siti@mail.com", paid: true },
  { name: "Andi", email: "andi@mail.com", paid: false },
  { name: "Budi", email: "budi@mail.com", paid: true },
  { name: "Rian", email: "rian@mail.com", paid: true }
];

/**
 * Daftar email pendaftar prioritas yang diambil melalui proses chaining method.
 * * Tahapan Proses:
 * 1. .filter() -> Menyaring dan hanya mengambil pendaftar dengan status `paid: true`.
 * 2. .map()    -> Mengubah array objek pendaftar menjadi array string yang hanya berisi `email`.
 * 3. .slice()  -> Memotong isi array untuk mengambil data dari indeks 0 hingga sebelum indeks 2 (yaitu indeks 0 dan 1).
 * * @type {Array<string>}
 */
const wishList = registrants
  .filter(registrant => registrant.paid === true)
  .map(registrant => registrant.email)
  .slice(0, 2);

// === OUTPUT VERIFIKASI ===
console.log('===== WISH LIST EMAILS =====');
console.log(wishList); 
// Output yang dihasilkan: [ 'siti@mail.com', 'budi@mail.com' ]