'use strict';

/**
 * Tahun acuan dasar (Epoch) yang digunakan untuk perhitungan penanggalan Unix (1 Januari 1970).
 * @type {number}
 */
const EPOCH_YEAR = 1970;

/**
 * Class untuk merepresentasikan, memanipulasi, dan mengurai data waktu 
 * dari milidetik menjadi format penanggalan berbasis UTC.
 */
class Tanggal {
  /** @type {number} Komponen tahun hasil dekomposisi */
  _year;
  /** @type {number} Komponen bulan hasil dekomposisi (0-11) */
  _month;
  /** @type {number} Komponen tanggal hasil dekomposisi (1-31) */
  _date;
  /** @type {number} Nilai mentah milidetik yang disimpan objek */
  _millis;

  /**
   * Membuat instance baru dari class Tanggal.
   * @param {number} millis - Jumlah milidetik sejak tanggal 1 Januari 1970 00:00:00 UTC.
   */
  constructor(millis){
    this._millis = millis;

    const totalDays = Math.floor(millis / (86400 * 1000));
    const { y, m , d} = this._decompose(totalDays);

    this._year = y;
    this._month = m;
    this._date = d;
  }

  /**
   * Mengambil sisa komponen milidetik dari total waktu berjalan.
   * @returns {number} Nilai sisa milidetik dalam rentang (0-999).
   */
  getMillis(){
    return this._millis % 1000;
  }

  /**
   * Mengambil komponen detik dari total waktu berjalan.
   * @returns {number} Nilai detik dalam rentang (0-59).
   */
  getSeconds(){
    return Math.floor(this._millis / 1000) % 60;
  }

  /**
   * Mengambil komponen menit dari total waktu berjalan.
   * @returns {number} Nilai menit dalam rentang (0-59).
   */
  getMinutes(){
    return Math.floor(this._millis / (60 * 1000)) % 60;
  }

  /**
   * Mengambil komponen jam dari total waktu berjalan dalam format 24 jam UTC.
   * @returns {number} Nilai jam dalam rentang (0-23).
   */
  getHours(){
    return Math.floor(this._millis / (1000 * 60 * 60)) % 24;
  }

  /**
   * Mengambil nilai tahun penuh yang dihitung dari objek Tanggal.
   * @returns {number} Nilai tahun (contoh: 2005, 2026).
   */
  getFullyear(){
    return this._year;
  }

  /**
   * Mengambil indeks bulan dari objek Tanggal (berbasis 0).
   * @returns {number} Indeks bulan berjalan (0 untuk Januari hingga 11 untuk Desember).
   */
  getMonth(){
    return this._month;
  }

  /**
   * Mengambil hari/tanggal dalam bulan dari objek Tanggal.
   * @returns {number} Nilai tanggal dalam rentang (1-31).
   */
  getDate(){
    return this._date;
  }

  /**
   * Menentukan total jumlah hari dalam satu bulan tertentu pada tahun tertentu.
   * @param {number} month - Indeks bulan berbasis 0 (0-11).
   * @param {number} year - Tahun penuh yang ingin diperiksa.
   * @returns {number} Jumlah hari pada bulan tersebut (28, 29, 30, atau 31).
   */
  getdaysInMonth(month, year){
    switch (month){
      case 0: case 2: case 4: case 6: case 7: case 9: case 11:
        return 31;
      case 3: case 5: case 8: case 10:
        return 30;
      case 1:
        return this._isLeapyear(year) ? 29 : 28;
    }
  }

  /**
   * Mengonversi representasi objek Tanggal menjadi string dengan format standar ISO 8601 (Extended).
   * @returns {string} String tanggal dengan format YYYY-MM-DDTHH:mm:ss.sssZ.
   */
  toISOString(){
    let str = String(this.getFullyear()).padStart(4);
    str += '-';
    str += String(this.getMonth() + 1).padStart(2, '0');
    str += '-';
    str += String(this.getDate()).padStart(2, '0');
    str += 'T';
    str += String(this.getHours()).padStart(2,'0');
    str += ':';
    str += String(this.getMinutes()).padStart(2, '0');
    str += ':';
    str += String(this.getSeconds()).padStart(2, '0');
    str += '.';
    str += String(this.getMillis()).padStart(3, '0');
    str += 'Z';
    return str;
  }

  /**
   * Mengurai akumulasi total hari menjadi struktur objek berisi tahun, bulan, dan tanggal.
   * @private
   * @param {number} days - Total akumulasi hari terhitung sejak Epoch.
   * @returns {{y: number, m: number, d: number}} Objek struktur dengan properti tahun (y), bulan (m), dan tanggal (d).
   */
  _decompose(days){
    let y = EPOCH_YEAR;
    let d = days;

    while (true){
      const daysInyear = this._isLeapyear(y) ? 366 : 365;
      if (d < daysInyear) break;
      d -= daysInyear;
      y++;
    }

    let m = 0;
    while ( d >= this.getdaysInMonth(m, y)){
      d -= this.getdaysInMonth(m, y);
      m ++;
    }
    return {y, m, d: d + 1};
  }

  /**
   * Memvalidasi apakah suatu tahun termasuk ke dalam kategori tahun kabisat.
   * @private
   * @param {number} year - Nilai tahun penuh yang akan divalidasi.
   * @returns {boolean} Mengembalikan `true` jika tahun kabisat, sebaliknya `false`.
   */
  _isLeapyear(year){
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }

  /**
   * Menangani konversi implisit/eksplisit objek Tanggal ke dalam tipe data primitif JavaScript.
   * @param {('string'|'number'|'default')} hint - Tipe data primitif target yang diekspektasikan oleh JavaScript Engine.
   * @returns {(string|number)} String ISO jika hint bernilai 'string', atau nilai milidetik jika berupa 'number'/'default'.
   */
  [Symbol.toPrimitive](hint){
    if (hint === 'string'){
      return this.toISOString();
    } 

    return this._millis;
  }
}