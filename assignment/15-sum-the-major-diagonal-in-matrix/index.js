/**
 * Program: Matriks Diagonal Sum Calculator
 * Deskripsi: Mengambil input matriks berukuran persegi dari user baris demi baris,
 * lalu menghitung jumlah elemen pada diagonal utama (major) dan diagonal sekunder (minor).
 */

const readline = require('readline-sync');

// Konstanta untuk menentukan ukuran matriks persegi (SIZE x SIZE)
const SIZE = 4;

/**
 * Mengubah string mentah berisi angka yang dipisahkan spasi menjadi array of numbers.
 * @param {string} str - String input dari user (contoh: "1 2 3 4")
 * @returns {number[]} Array berisi angka-angka hasil konversi
 */
function parseNumber(str) {
  return str.split(' ').map(Number);
}

/**
 * Meminta input baris matriks dari user melalui terminal.
 * Fungsi ini memiliki validasi built-in menggunakan loop: jika jumlah elemen yang dimasukkan
 * tidak sesuai dengan konstanta SIZE, user akan diminta untuk menginput ulang.
 * @returns {number[]} Array angka yang valid dengan panjang sesuai dengan SIZE
 */
function readRow() {
  while (true) {
    // Membaca input teks dari user
    const str = readline.question();
    
    // Mengonversi teks input menjadi array angka
    const input = parseNumber(str);
    
    // Validasi jumlah elemen
    if (input.length !== SIZE) {
      console.log(`Please input ${SIZE} element.`);
    } else { 
      // Jika valid, kembalikan array dan hentikan perulangan (exit function)
      return input; 
    }
  }
}

/**
 * Menghitung jumlah elemen pada Diagonal Utama (Major Diagonal).
 * Diagonal utama berjalan dari ujung kiri atas ke ujung kanan bawah (indeks [0][0], [1][1], dst).
 * @param {number[][]} arr - Matriks 2D berukuran persegi
 * @returns {number} Hasil penjumlahan elemen diagonal utama
 */
function sumMajorDiagonal(arr) {
  let sum = 0;

  for (let i = 0; i < SIZE; i++) {
    // Elemen diagonal utama selalu memiliki indeks baris dan kolom yang sama (i == j)
    sum += arr[i][i];
  }
  return sum;
}

/**
 * Menghitung jumlah elemen pada Diagonal Sekunder (Minor Diagonal).
 * Diagonal sekunder berjalan dari ujung kanan atas ke ujung kiri bawah (indeks [0][SIZE-1], [1][SIZE-2], dst).
 * @param {number[][]} arr - Matriks 2D berukuran persegi
 * @returns {number} Hasil penjumlahan elemen diagonal sekunder
 */
function sumMinorDiagonal(arr) {
  let sum = 0;

  for (let i = 0; i < SIZE; i++) {
    // Indeks kolom bergerak mundur menggunakan rumus: SIZE - 1 - i
    sum += arr[i][SIZE - 1 - i];
  }
  return sum;
}

// ==========================================
//           ALUR UTAMA PROGRAM
// ==========================================

// Inisialisasi array kosong untuk menampung matriks 2D
let matrix = [];

console.log(`Enter a ${SIZE}-by-${SIZE} matrix row by row:`);

// Mengambil input dari user sebanyak jumlah baris (SIZE)
for (let row = 0; row < SIZE; row++) {
  matrix.push(readRow());
}

// Melakukan perhitungan total masing-masing diagonal
const sumMajor = sumMajorDiagonal(matrix);
const sumMinor = sumMinorDiagonal(matrix);

// Menampilkan hasil ke layar/terminal
console.log("\nYour Matrix:");
console.log(matrix);

console.log(`\nSum of the elements in the major diagonal is ${sumMajor}`);
console.log(`Sum of the elements in the minor diagonal is ${sumMinor}`);