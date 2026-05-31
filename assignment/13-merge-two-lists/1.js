/**
 * PROGRAM PENGGABUNG DAN PENGURUTAN ARRAY (MERGE & COUNTING SORT)
 * Menggabungkan dua deret angka dari input pengguna, lalu mengurutkannya
 * secara manual memanfaatkan sifat otomatis key-index pada Objek JavaScript.
 */

const readline = require('readline-sync');

/**
 * Mengonversi teks string input menjadi array berisi angka-angka bersih.
 * @param {string} str - Teks string berisi angka yang dipisahkan spasi (misal: "5 2 9").
 * @returns {number[]} Array satu dimensi yang menampung angka-angka hasil konversi.
 */
function parseNumber(str){
    // Memecah teks utuh menjadi array potongan teks berdasarkan karakter spasi
    const strs = str.split(' ');
    const numbers = [];

    for (let i = 0; i < strs.length; i++){
        // Tanda plus (+) mengubah tipe data string seperti "5" menjadi angka murni 5
        const number = +strs[i];
        numbers.push(number);
    }

    return numbers;
}

/**
 * Menggabungkan dua buah array menjadi satu array baru (Concatenation).
 * @param {number[]} arr1 - Array pertama yang ingin digabungkan.
 * @param {number[]} arr2 - Array kedua yang ingin digabungkan.
 * @returns {number[]} Array baru yang berisi gabungan elemen dari arr1 dan arr2.
 */
function merge(arr1, arr2){
    let results = [];
    
    // Memasukkan seluruh elemen dari array pertama
    for (let i = 0; i < arr1.length; i++){
        results.push(arr1[i]);
    }
    // Melanjutkan memasukkan seluruh elemen dari array kedua
    for (let i = 0; i < arr2.length; i++){
        results.push(arr2[i]);
    }

    return results;
}

/**
 * Menghitung frekuensi/jumlah kemunculan setiap angka di dalam array.
 * @param {number[]} values - Array kumpulan angka yang ingin dihitung frekuensinya.
 * @returns {Object.<string, number>} Objek yang memetakan "Angka" sebagai KEY dan "Jumlah Kemunculan" sebagai VALUE.
 * @example input: [5, 2, 5] -> hasil: { "2": 1, "5": 2 }
 */
function buildOccurences(values){
    let occurences = {};

    for (let i = 0; i < values.length; i++){
        const value = values[i];

        // Cek apakah angka ini sudah pernah dicatat di dalam objek sebelumnya
        if (value in occurences){
            occurences[value]++; // Jika sudah ada, tambahkan hitungannya (frekuensi + 1)
        } else {
            occurences[value] = 1; // Jika belum ada, buat catatan baru dengan hitungan awal 1
        }
    }

    return occurences;
}

/**
 * Mengurutkan kumpulan angka menggunakan algoritma berbasis hitungan objek (Counting Sort).
 * Memanfaatkan karakteristik JavaScript yang otomatis mengurutkan KEY objek jika berbentuk angka bulat.
 * @param {number[]} values - Array acak yang ingin diurutkan.
 * @returns {number[]} Array baru yang elemennya sudah terurut dari terkecil ke terbesar.
 */
function sort(values){
    // Langkah 1: Ubah array acak menjadi peta frekuensi objek (otomatis terurut oleh mesin JS)
    const occurences = buildOccurences(values);

    const sorted = [];

    // Langkah 2: Ekstrak kembali isi objek menjadi susunan array
    for (const number in occurences){
        const value = occurences[number]; // 'value' di sini bertindak sebagai jumlah kemunculan

        // Lakukan push angka sebanyak jumlah kemunculannya
        for (let i = 0; i < value; i++)
            // Tanda plus (+) memastikan 'number' yang aslinya KEY bertipe String dikembalikan menjadi tipe Angka
            sorted.push(+number);
    }
    return sorted
}

/**
 * Menggabungkan seluruh elemen array menjadi satu baris teks string murni dengan karakter pemisah tertentu.
 * @param {number[]} values - Array berisi angka-angka yang sudah terurut.
 * @param {string} separator - Karakter pemisah antar angka saat digabungkan (misal: spasi atau koma).
 * @returns {string} Hasil string gabungan yang siap dicetak ke layar terminal.
 */
function join(values, separator){
    // Pengaman: Jika array kosong, langsung kembalikan teks kosong agar tidak error
    if (values.length === 0){
        return '';
    }

    // Ambil angka pertama sebagai modal awal string teks
    let joined = values[0];

    // Mulai loop dari indeks ke-1 untuk menempelkan separator dan angka berikutnya
    for (let i = 1; i < values.length; i++){
        joined += `${separator}${values[i]}`;
    }

    return joined;
}

// ==========================================
// ALUR EKSEKUSI PROGRAM UTAMA
// ==========================================

// 1. Meminta input 2 deret angka terpisah dari pengguna
const list1 = parseNumber(readline.question('Enter list1: '));
const list2 = parseNumber(readline.question('Enter list2: '));

// 2. Menggabungkan list1 dan list2 menjadi satu kesatuan array acak
const merged = merge(list1, list2);

// 3. Mengurutkan array gabungan tersebut menggunakan fungsi sort manual (Counting Sort)
const sorted = sort(merged);

// 4. Mengubah array angka yang sudah rapi menjadi baris string dipisahkan spasi
const joined = join(sorted, ' ');

// 5. Menampilkan hasil akhir pengurutan ke layar terminal
console.log(`The merged list is ${joined}`);