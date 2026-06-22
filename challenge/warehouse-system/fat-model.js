"use strict";

const rl = require('readline-sync');

const Menu = Object.freeze({
  'CHECK_STATUS': 1,
  'STORE_ITEMS': 2,
  'RELEASE_SLOT': 3,
  'EXIT': 4,
});

// ==========================================
// 1. MODELS (FAT MODEL - LOGIKA BISNIS DI SINI)
// ==========================================

class StorageSlot {
  constructor(id, zone) {
    Object.defineProperties(this, {
      id: { value: id, enumerable: true, configurable: true },
      zone: { value: zone, enumerable: true, configurable: true },
    });
    this.isOccupied = false;
    this.currentLoad = 0;
  }

  /**
   * Logika dasar validasi penyimpanan (Agnostik murni).
   * @param {number} amount 
   * @returns {string|null} Mengembalikan pesan error jika tidak valid, atau null jika lolos.
   */
  validateIncomingLoad(amount) {
    if (isNaN(amount) || amount <= 0) {
      return 'Please enter a correct number.';
    }
    return null;
  }

  /**
   * Mengisi barang ke dalam slot (Mutasi Data internal).
   * @param {number} amount 
   */
  addItems(amount) {
    this.isOccupied = true;
    this.currentLoad = amount;
  }

  /**
   * Mengosongkan barang dari slot (Mutasi Data internal).
   */
  clearItems() {
    this.currentLoad = 0;
    this.isOccupied = false;
  }
}

class ColdStorage extends StorageSlot {
  constructor(id, temperature) {
    super(id, 'cold');
    this.temperature = temperature || -15;
  }

  // ColdStorage mewarisi metode validasi dasar karena kapasitasnya Infinity
}

class DryStorage extends StorageSlot {
  constructor(id, maxWeight) {
    super(id, 'dry');
    this.maxWeightLimit = maxWeight;
  }

  /**
   * Polymorphism: DryStorage memperketat aturan validasi dengan batas beratnya sendiri.
   * @override
   */
  validateIncomingLoad(amount) {
    // Jalankan pengecekan dasar dari StorageSlot dulu
    const baseError = super.validateIncomingLoad(amount);
    if (baseError) return baseError;

    // Tambahkan aturan bisnis khusus DryStorage
    if (amount > this.maxWeightLimit) {
      return 'The amount of items is overload.';
    }
    return null; 
  }
}

class WareHouseModel {
  constructor() {
    this._dataSlots = new Map();
  }
  generateColdStoreageSlots(coldStorages) {
    for (const coldStorageData of coldStorages) {
      const coldStorageInstance = new ColdStorage(coldStorageData.id, coldStorageData.temperature);
      this._dataSlots.set(coldStorageInstance.id, coldStorageInstance);
    }
  }
  generateDryStorageSlots(dryStorages) {
    for (const dryStorageData of dryStorages) {
      const dryStorage = new DryStorage(dryStorageData.id, dryStorageData.maxWeight);
      this._dataSlots.set(dryStorage.id, dryStorage);
    }
  }
  getStorageSlot(id) {
    return this._dataSlots.get(id);
  }
  hasStorageSlot(id) {
    return this._dataSlots.has(id);
  }
  [Symbol.iterator]() {
    const slotValue = this._dataSlots.values();
    return {
      next() {
        return slotValue.next();
      }
    };
  }
}

// ==========================================
// 2. VIEWS (PASSIVE VIEW - TETAP BERSIH)
// ==========================================

class WarehouseView {
  displayMenu() {
    console.log('Menu');
    console.log('1. Check Slot Status');
    console.log('2. Store Items');
    console.log('3. Release Slot');
    console.log('4. Exit');
    console.log('-'.repeat(20));
  }
  displayWareHouseSlot(storageSlot) {
    console.log(`ID: ${storageSlot.id}`);
    console.log(`STATUS: ${!storageSlot.isOccupied ? 'Empty' : `Occupied (${storageSlot.currentLoad} kg)`}`);
    if (storageSlot instanceof ColdStorage) {
      console.log(`TEMPERATURE: ${storageSlot.temperature} Celcius`);
    } else if (storageSlot instanceof DryStorage) {
      console.log(`MAX WEIGHT: ${storageSlot.maxWeightLimit} kg`);
    }
  }
  displayInvalidInputId(inputId) {
    console.log(`Slot with id "${inputId}" cannot be found!`);
  }
  displayInvalidChoiceInput() {
    console.log('Please enter the correct choice!');
  }
  displaySuccessStore(loadInput) {
    console.log(`Success to store items with current load of ${loadInput} kg!`);
  }
  displayInvalidLoad(reason) {
    console.log(`Failed to load: ${reason}`);
  }
  displayInvalidStore() {
    console.log('This Slot is Occupied');
  }
  displaySuccessRemove() {
    console.log('This slot items has removed.');
  }
  displayInvalidRemove() {
    console.log('This slot is empty!');
  }
  displayExitLog() {
    console.log('Please input slot ID again...');
  }
}

class PromptView {
  idInput() {
    return rl.question('Please input slot id: ').trim().toUpperCase();
  }
  choiceInput() {
    return Number(rl.question('Select your choice: '));
  }
  loadInput() {
    return Number(rl.question('Fill amount of load: '));
  }
}

// ==========================================
// 3. CONTROLLER (SKINNY CONTROLLER - HANYA POLANTAS)
// ==========================================

class WareHouseController {
  constructor(coldData, dryData) {
    this._model = new WareHouseModel();
    this._view = new WarehouseView();
    this._promptView = new PromptView();
    this._model.generateColdStoreageSlots(coldData);
    this._model.generateDryStorageSlots(dryData);
  }

  validateIdInput() {
    while (true) {
      const idInput = this._promptView.idInput();
      if (!this._model.hasStorageSlot(idInput)) {
        this._view.displayInvalidInputId(idInput);
        continue;
      }
      return idInput;
    }
  }

  /**
   * Controller tidak perlu melakukan loop validasi matematika lagi di sini.
   * Cukup meminta input, lalu melemparkannya ke Model untuk dievaluasi kelayakannya.
   */
  getValidatedLoad(storageSlot) {
    while (true) {
      const loadInput = this._promptView.loadInput();
      
      // DELEGASI: Serahkan urusan berpikir aturan bisnis ke Model secara agnostik
      const errorMessage = storageSlot.validateIncomingLoad(loadInput);
      
      if (errorMessage) {
        this._view.displayInvalidLoad(errorMessage); // View mencetak pesan error kiriman dari Model
        continue;
      }
      return loadInput;
    }
  }

  start() {
    while (true) {
      const idInput = this.validateIdInput();
      const storageSlot = this._model.getStorageSlot(idInput);
      let choice;
      
      do {
        this._view.displayMenu();
        choice = this._promptView.choiceInput();
        console.log('');
        
        switch (choice) {
          case Menu.CHECK_STATUS:
            this._view.displayWareHouseSlot(storageSlot);
            break;
            
          case Menu.STORE_ITEMS:
            if (storageSlot.isOccupied) {
              this._view.displayInvalidStore();
            } else {
              // Controller tinggal memanggil helper yang meminta Model memvalidasi
              const loadInput = this.getValidatedLoad(storageSlot);
              
              // Perintahkan Model untuk mengubah datanya sendiri
              storageSlot.addItems(loadInput);
              this._view.displaySuccessStore(loadInput);
            }
            break;
            
          case Menu.RELEASE_SLOT:
            if (!storageSlot.isOccupied) {
              this._view.displayInvalidRemove();
            } else {
              // Perintahkan Model untuk mengosongkan datanya sendiri
              storageSlot.clearItems();
              this._view.displaySuccessRemove();
            }
            break;
            
          case Menu.EXIT:
            this._view.displayExitLog();
            break;
            
          default:
            this._view.displayInvalidChoiceInput();
        }
        console.log('');
      } while (choice !== Menu.EXIT);
    }
  }
}

// Data Array Sets Definitions
const coldSlots = [{ id: 'ZONE-A01', temperature: -20 }, { id: 'ZONE-A02' }, { id: 'ZONE-A03', temperature: -10 }];
const drySlots = [{ id: 'ZONE-B01', maxWeight: 1000 }, { id: 'ZONE-B02', maxWeight: 500 }, { id: 'ZONE-B03', maxWeight: 1500 }];

// Pipeline Execution
const controller = new WareHouseController(coldSlots, drySlots);
controller.start();