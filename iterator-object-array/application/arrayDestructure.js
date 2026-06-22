"use strict";

/**
 * @fileoverview Dokumentasi ekstraksi data elemen desain Canva Premium Kit.
 * @description Kode ini mendemonstrasikan penggunaan Array Destructuring 
 * untuk memetakan koordinat dan aset gaya visual ke dalam variabel yang deskriptif.
 */

/**
 * Data mentah elemen desain yang diambil dari canvas.
 * Susunan indeks array:
 * - Indeks 0: Koordinat X (number)
 * - Indeks 1: Koordinat Y (number)
 * - Indeks 2: Kode warna HEX brand (string)
 * - Indeks 3: Gaya/Style desain (string)
 * * @type {[number, number, string, string]}
 */
const elementData = [400, 300, '1E293B', 'Clean Line Art'];

/**
 * Melakukan proses Array Destructuring untuk memecah `elementData`
 * menjadi variabel-variabel mandiri yang bermakna.
 * * @var {number} xCoordinate - Posisi horizontal elemen pada canvas (pixel).
 * @var {number} yCoordinate - Posisi vertikal elemen pada canvas (pixel).
 * @var {string} brandColor  - Kode warna utama brand dalam format HEX (tanpa tanda #).
 * @var {string} designStyle - Kategori atau tema visual estetika elemen.
 */
const [ xCoordinate, yCoordinate, brandColor, designStyle ] = elementData;

// === OUTPUT LOG / VERIFIKASI DATA ===
console.log(`X: ${xCoordinate}`);      // Output: X: 400
console.log(`Y: ${yCoordinate}`);      // Output: Y: 300
console.log(`Color: #${brandColor}`);  // Output: Color: #1E293B (Diberi # agar format HEX valid)
console.log(`Style: ${designStyle}`);  // Output: Style: Clean Line Art