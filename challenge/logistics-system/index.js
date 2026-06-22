"use strict";

const rl = require('readline-sync');

// =========================================================================
// 1. ENTITY MODELS (Representasi Data & Aturan Read-Only)
// =========================================================================

/**
 * @class Package
 * @description Kelas induk abstrak yang merepresentasikan data paket dasar.
 * Memanfaatkan Object.defineProperties untuk mengunci data agar bersifat Read-Only.
 */
class Package {
  /**
   * @param {string} id - ID unik paket.
   * @param {string} type - Jenis kategori paket ('express' / 'heavy').
   * @param {string} destination - Kota tujuan pengiriman.
   * @param {number} weight - Berat bersih paket dalam satuan Kilogram (Kg).
   */
  constructor(id, type, destination, weight) {
    Object.defineProperties(this, {
      id: { value: id, enumerable: true, configurable: true },
      type: { value: type, enumerable: true, configurable: true },
      destination: { value: destination, enumerable: true, configurable: true },
      weight: { value: weight, enumerable: true, configurable: true },
    });
  }
}

/**
 * @class ExpressPackage
 * @extends Package
 * @description Spesialisasi paket cepat dengan batasan waktu kedaluwarsa.
 */
class ExpressPackage extends Package {
  /**
   * @param {string} id - ID unik paket express.
   * @param {string} destination - Kota tujuan pengiriman.
   * @param {number} weight - Berat paket (Kg).
   * @param {number} expiryHours - Batas waktu pengiriman dalam satuan jam.
   */
  constructor(id, destination, weight, expiryHours) {
    super(id, 'express', destination, weight);
    this.expiryHours = expiryHours;
  }
}

/**
 * @class HeavyPackage
 * @extends Package
 * @description Spesialisasi kargo berat yang memerlukan penanganan khusus (alat berat/crane).
 */
class HeavyPackage extends Package {
  /**
   * @param {string} id - ID unik paket kargo berat.
   * @param {string} destination - Kota tujuan pengiriman.
   * @param {number} weight - Berat paket (Kg).
   * @param {boolean} isRequireCrane - Penanda apakah paket wajib dibongkar menggunakan crane.
   */
  constructor(id, destination, weight, isRequireCrane) {
    super(id, "heavy", destination, weight);
    this.requireCrane = isRequireCrane;
  }
}

// =========================================================================
// 2. COLLECTION MODEL (Pengelola Memori & Filter Data Murni)
// =========================================================================

/**
 * @class LogisticsModel
 * @description Pusat penyimpanan data logistik pangkalan yang mengelola koleksi Map internal.
 * Steril dari aturan input dan berfokus pada penyaringan berbasis kapasitas berat.
 */
class LogisticsModel {
  constructor() {
    /** @private */
    this._logistics = new Map();
  }

  /**
   * Mentransformasikan array objek mentah menjadi instance ExpressPackage ke dalam Map.
   * @param {Array<Object>} expressArray 
   */
  generateExpressLogistics(expressArray) {
    for (const logisticData of expressArray) {
      const logistic = new ExpressPackage(logisticData.id, logisticData.destination, logisticData.weight, logisticData.expiryHours);
      this._logistics.set(logistic.id, logistic);
    }
  }

  /**
   * Mentransformasikan array objek mentah menjadi instance HeavyPackage ke dalam Map.
   * @param {Array<Object>} heavyArray 
   */
  generateHeavyLogistics(heavyArray) {
    for (const logisticData of heavyArray) {
      const logistic = new HeavyPackage(logisticData.id, logisticData.destination, logisticData.weight, logisticData.requiresCrane);
      this._logistics.set(logistic.id, logistic);
    }
  }

  /**
   * Menyaring seluruh paket di gudang secara murni berdasarkan batasan berat maksimum.
   * @param {number} weightLimit - Batas berat maksimal kendaraan.
   * @returns {Map<string, Package>} Koleksi sub-Map paket yang lolos seleksi berat.
   */
  filterLogisticWeight(weightLimit) {
    const packageList = new Map();
    for (const [id, item] of this._logistics) {
      if (item.weight <= weightLimit) {
        packageList.set(id, item);
      }
    }
    return packageList;
  }
}

// =========================================================================
// 3. VIEWS (Presentasi Antarmuka Pasif Terminal)
// =========================================================================

/**
 * @class LogisticView
 * @description Menangani cetakan teks visual dan laporan hasil pencocokan kargo ke layar terminal.
 */
class LogisticView {
  displayHeader() {
    console.log('=========================================');
    console.log('  SMART FLEET MATCHING LOGISTICS SYSTEM');
    console.log('=========================================');
  }

  /**
   * Mencetak detail manifest paket yang berhasil dicocokkan oleh Controller.
   * @param {Map<string, Package>} filteredList 
   */
  displayPackage(filteredList) {
    console.log(`MATCH FOUND [ ${filteredList.size} ${filteredList.size > 1 ? 'packages' : 'package'} matched for this vehicle ]`);
    console.log('-'.repeat(52));
    for (const [id, item] of filteredList) {
      console.log('');
      console.log(`ID: ${id}`);
      console.log(`Type: ${item.type}`);
      console.log(`Destination: ${item.destination}`);
      console.log(`Weight: ${item.weight} Kg`);
      if (item instanceof ExpressPackage) {
        console.log(`Expiry Time: ${item.expiryHours} ${item.expiryHours > 1 ? 'hours' : 'hour'}`);
      } else if (item instanceof HeavyPackage) {
        console.log(`Need Crane: ${item.requireCrane ? 'YES' : 'NO'}`);
      }
      console.log('-'.repeat(52));
    }
  }

  displayUnmatchedPackage() {
    console.log('NO MATCH: No packages fit this vehicle specifications or capacity limits.');
  }

  displayInvalidMaxWeightInput() {
    console.log('Please Enter the correct maximum weight!');
  }

  /**
   * @param {string} vehicle - Nama tipe kendaraan yang melanggar batas regulasi.
   */
  displayInvalidVehicleMaxWeight(vehicle) {
    console.log(`Your input exceeded maximum weight limit of ${vehicle}`);
  }

  displayInvalidEntry() {
    console.log('Invalid Input! Please try again.');
  }

  displayExit() {
    console.log('Thank you for using Smart Logistics System. Goodbye!');
  }
}

/**
 * @class PromptView
 * @description Menangani penangkapan input mentah dari keyboard pengguna secara sinkron.
 */
class PromptView {
  /**
   * @param {Array<string>} vehicleData - Daftar kendaraan resmi yang tersedia.
   * @returns {string} String tipe kendaraan dalam format UPPERCASE bersih.
   */
  inputVehicle(vehicleData) {
    return rl.question(`Enter Available Vehicle Type (${vehicleData.join('/')}): `).trim().toUpperCase();
  }

  /**
   * @returns {number} Angka kapasitas maksimal hasil konversi input pengguna.
   */
  inputVehicleMaxCapacity() {
    return Number(rl.question('Enter Vehicle Maximum Capacity (Kg): ').trim());
  }

  /**
   * @returns {string} Teks konfirmasi kelanjutan program dalam format UPPERCASE.
   */
  inputExit() {
    return rl.question('Press Enter to match another vehicle, or type "exit" to quit: ').trim().toUpperCase();
  }
}

// =========================================================================
// 4. CONTROLLER (Orchestrator Pengambil Keputusan & Alur Operasional)
// =========================================================================

/**
 * @class LogisticController
 * @description Pengatur lalu lintas data aplikasi. Mengambil input, meminta Model menyaring berat,
 * mengevaluasi kecocokan jenis armada, dan memerintahkan View untuk menampilkan hasil.
 */
class LogisticController {
  constructor() {
    this._model = new LogisticsModel();
    this._view = new LogisticView();
    this._promptView = new PromptView();

    this._model.generateExpressLogistics(expressPackages);
    this._model.generateHeavyLogistics(heavyPackages);
  }

  /**
   * Memvalidasi keabsahan jenis kendaraan yang diinput pengguna.
   * @returns {string} Jenis kendaraan yang valid (VAN / MOTORCYCLE / BIG TRUCK).
   */
  validateVehicleInput() {
    const vehicles = vehiclesData;
    while (true) {
      const inputVehicle = this._promptView.inputVehicle(vehicles);
      if (!vehicles.includes(inputVehicle)) {
        this._view.displayInvalidEntry();
        continue;
      }
      return inputVehicle;
    }
  }

  /**
   * Memvalidasi kapasitas muatan agar sesuai dengan batasan fisik standar industri masing-masing armada.
   * @param {string} inputVehicle - Jenis kendaraan yang sudah tervalidasi.
   * @returns {number} Nilai berat kapasitas yang valid dan aman.
   */
  validateVehicleMaxCapacityInput(inputVehicle) {
    while (true) {
      const maxWeightInput = this._promptView.inputVehicleMaxCapacity();
      // FIX: Operator <-0 diperbaiki menjadi <= 0 agar logika matematika berjalan normal
      if (isNaN(maxWeightInput) || maxWeightInput <= 0) {
        this._view.displayInvalidMaxWeightInput();
        continue;
      }
      if (inputVehicle === 'MOTORCYCLE') {
        if (maxWeightInput > 30) {
          this._view.displayInvalidVehicleMaxWeight(inputVehicle);
          continue;
        }
        return maxWeightInput;
      } 
      if (inputVehicle === 'VAN') {
        if (maxWeightInput > 200) {
          this._view.displayInvalidVehicleMaxWeight(inputVehicle);
          continue;
        }
        return maxWeightInput;
      }
      if (inputVehicle === 'BIG TRUCK') {
        if (maxWeightInput > 15000) {
          this._view.displayInvalidVehicleMaxWeight(inputVehicle);
          continue;
        }
        return maxWeightInput;
      }
    }
  }

  /**
   * Menjembatani filter berat Model dengan melakukan penyaringan sekunder berbasis jenis kargo armada.
   * @param {string} vehicleInput - Jenis kendaraan pangkalan.
   * @param {number} weightLimit - Kapasitas tonase kendaraan.
   * @returns {Map<string, Package>} Hasil Map final paket yang lolos uji berat dan tipe kendaraan.
   */
  matchingPackageAndVehicle(vehicleInput, weightLimit) {
    const filteredList = this._model.filterLogisticWeight(weightLimit);
    const matchedPackage = new Map();

    for (const [id, item] of filteredList) {
      let isVehicleMatch = false;

      if (item instanceof ExpressPackage) {
        isVehicleMatch = (vehicleInput === 'VAN' || vehicleInput === 'MOTORCYCLE');
      } else if (item instanceof HeavyPackage) {
        isVehicleMatch = (vehicleInput === 'BIG TRUCK');
      }
      
      if (isVehicleMatch) {
        matchedPackage.set(id, item);
      }
    }
    return matchedPackage;
  }

  /**
   * Titik masuk utama (Entry Point) eksekusi siklus loop aplikasi.
   */
  start() {
    while (true) {
      this._view.displayHeader();
      const vehicleInput = this.validateVehicleInput();
      const maxWeight = this.validateVehicleMaxCapacityInput(vehicleInput);
      const packageList = this.matchingPackageAndVehicle(vehicleInput, maxWeight);
      console.log('');

      if (packageList.size === 0) {
        this._view.displayUnmatchedPackage();
      } else {
        this._view.displayPackage(packageList);
      }
      console.log('');
      const checkExit = this._promptView.inputExit();
      if (checkExit === 'EXIT') {
        console.log('');
        this._view.displayExit();
        break;
      }
      console.log('');
    }
  }
}

// =========================================================================
// GLOBAL DATA SETS DEFINITIONS
// =========================================================================

/** @type {Array<string>} */
const vehiclesData = ['VAN', 'MOTORCYCLE', 'BIG TRUCK'];

/** @type {Array<Object>} */
const expressPackages = [
  { id: 'EXP-01', destination: 'Jakarta', weight: 10, expiryHours: 12 },
  { id: 'EXP-02', destination: 'Bandung', weight: 50, expiryHours: 6 },
  { id: 'EXP-03', destination: 'Surabaya', weight: 25, expiryHours: 24 },
  { id: 'EXP-04', destination: 'Yogyakarta', weight: 5, expiryHours: 4 },
  { id: 'EXP-05', destination: 'Semarang', weight: 120, expiryHours: 48 } 
];

/** @type {Array<Object>} */
const heavyPackages = [
  { id: 'HVY-01', destination: 'Surabaya', weight: 5000, requiresCrane: true },
  { id: 'HVY-02', destination: 'Semarang', weight: 12000, requiresCrane: false },
  { id: 'HVY-03', destination: 'Medan', weight: 8500, requiresCrane: true },
  { id: 'HVY-04', destination: 'Makassar', weight: 15000, requiresCrane: true },
  { id: 'HVY-05', destination: 'Palembang', weight: 3000, requiresCrane: false }
];

// Pipeline Execution
const controller = new LogisticController();
controller.start();