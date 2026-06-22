"use strict";

/**
 * @fileoverview Dokumentasi Konfigurasi Deskriptor Objek (Object Property Descriptor).
 * @description Kode ini mendemonstrasikan cara mengunci properti objek menggunakan
 * `Object.defineProperty` agar properti tersebut bersifat Read-Only (tidak bisa diubah) 
 * dan Non-Configurable (tidak bisa dihapus atau diubah konfigurasinya).
 */

/**
 * Objek cetakan (template) premium.
 * @type {{title: string}}
 */
const premiumTemplate = {
  title: "Canva Premium Pastel Kit"
};

/**
 * Mengubah konfigurasi internal (descriptor) dari properti 'title' pada objek premiumTemplate.
 * * - `writable: false`      -> Membuat properti menjadi READ-ONLY. Jika dicoba diubah di strict mode, akan melempar TypeError.
 * - `configurable: false`  -> Mengunci properti agar tidak bisa dihapus menggunakan keyword `delete` 
 * dan atribut descriptor-nya tidak bisa diubah lagi lewat defineProperty berikutnya.
 */
Object.defineProperty(premiumTemplate, 'title', {
  writable: false,
  configurable: false,
});

// === OUTPUT VERIFIKASI ===
console.log('===== PROPERTY DESCRIPTOR =====');
/**
 * Mengambil dan menampilkan informasi descriptor dari properti 'title'.
 * Output akan menampilkan status: value, writable, enumerable, dan configurable.
 */
console.log(Object.getOwnPropertyDescriptor(premiumTemplate, 'title'));
/* Output yang dihasilkan:
{
  value: 'Canva Premium Pastel Kit',
  writable: false,
  enumerable: true,
  configurable: false
}
*/