'use strict';

const rl = require('readline-sync');

// =========================================================================
// 1. ENTITY LAYER (ES5 CONSTRUCTOR FUNCTIONS & PROTO-INHERITANCE)
// =========================================================================

/**
 * @constructor GridLoad
 * @description Constructor induk dasar untuk memetakan beban daya listrik.
 * Properti 'id' dan 'type' diamankan menggunakan Object.defineProperties agar Read-Only.
 * @param {string} id - ID unik muatan beban.
 * @param {string} type - Tipe kategori beban ('residential' / 'industrial').
 * @param {string} zone - Nama wilayah/zona lokasi beban.
 * @param {number} demandKW - Kebutuhan konsumsi daya listrik dalam satuan Kilowatt (KW).
 */
function GridLoad(id, type, zone, demandKW){
  Object.defineProperties(this, {
    id: { value: id, writable: false, enumerable: true, configurable: true },
    type: { value: type, writable: false, enumerable: true, configurable: true },
  });
  this.zone = zone;
  this.demandKW = demandKW;
}

/**
 * @constructor ResidentialLoads
 * @extends GridLoad
 * @description Representasi beban listrik untuk area perumahan/domestik.
 * @param {string} id - ID unik beban perumahan.
 * @param {string} zone - Nama kluster/zona perumahan.
 * @param {number} demandKW - Kebutuhan daya listrik (KW).
 * @param {number} peakHour - Jam sibuk beban puncak konsumsi energi (format 24 jam).
 */
function ResidentialLoads(id, zone, demandKW, peakHour){
  GridLoad.call(this, id, 'residential', zone, demandKW);
  this.peakHour = peakHour;
}

// Menghubungkan rantai prototype dan mendaftarkan akta kelahiran constructor secara non-enumerable
ResidentialLoads.prototype = Object.create(GridLoad.prototype,{
  constructor: { value: ResidentialLoads, writable: true, enumerable: false, configurable: false },
});

/**
 * @constructor IndustrialLoads
 * @extends GridLoad
 * @description Representasi beban listrik berskala besar untuk area perindustrian/pabrik.
 * @param {string} id - ID unik beban industri.
 * @param {string} zone - Nama kawasan industri.
 * @param {number} demandKW - Kebutuhan daya listrik (KW).
 * @param {boolean} requiresHighVoltage - Penanda apakah membutuhkan suplai tegangan tinggi.
 */
function IndustrialLoads(id, zone, demandKW, requiresHighVoltage){
  GridLoad.call(this, id, 'industrial', zone, demandKW);
  this.requiresHighVoltage = requiresHighVoltage;
}

// Menghubungkan rantai prototype dan mendaftarkan akta kelahiran constructor secara non-enumerable
IndustrialLoads.prototype = Object.create(GridLoad.prototype,{
  constructor: { value: IndustrialLoads, writable: true, enumerable: false, configurable: false },
});

// =========================================================================
// 2. MODEL LAYER (COLLECTION BASE MAP - STERIL DARI INPUT USER)
// =========================================================================

/**
 * @constructor GridModel
 * @description Pusat data koleksi Map internal yang menyimpan seluruh muatan beban listrik pangkalan.
 */
function GridModel(){
  /** @private */
  this._grid = new Map();
}

/**
 * Memetakan dan menginstansiasi array objek mentah residential loads ke memori internal Map.
 * @param {Array<Object>} resLoadArray 
 */
GridModel.prototype.generateResidentialLoads = function (resLoadArray){
  for (const resLoad of resLoadArray){
    const load = new ResidentialLoads(resLoad.id, resLoad.zone, resLoad.demandKW, resLoad.peakHour);
    this._grid.set(load.id, load);
  }
};

/**
 * Memetakan dan menginstansiasi array objek mentah industrial loads ke memori internal Map.
 * @param {Array<Object>} indsLoadArray 
 */
GridModel.prototype.generateIndustrialLoads = function (indsLoadArray){
  for (const indsLoad of indsLoadArray){
    const load = new IndustrialLoads(indsLoad.id, indsLoad.zone, indsLoad.demandKW, indsLoad.requiresHighVoltage);
    this._grid.set(load.id, load);
  }
};

/**
 * Mengambil data Map internal penampung beban.
 * @returns {Map<string, GridLoad>}
 */
GridModel.prototype.getGrids = function(){
  return this._grid;
}

/**
 * Menyaring beban secara murni hanya berdasarkan batas maksimal kapasitas KW trafo.
 * @param {number} maxKW - Batas kapasitas daya maksimum trafo pengirim.
 * @returns {Map<string, GridLoad>} Koleksi sub-Map beban yang dayanya muat.
 */
GridModel.prototype.filterLoadLList = function(maxKW){
  const filteredList = new Map();

  for (const data of this._grid.values()){
    if(data.demandKW <= maxKW){
      filteredList.set(data.id, data)
    }
  }
  return filteredList;
};

// =========================================================================
// 3. VIEW LAYER (PRESENTASI ANTARMUKA TERMINAL PASIF)
// =========================================================================

/**
 * @constructor GridView
 * @description Menangani cetakan output teks deskriptif visual ke terminal.
 */
function GridView(){}

GridView.prototype.displayTitle = function(){
  console.log ('=========================================');
  console.log('⚡ SMART GRID ENERGY MANAGEMENT SYSTEM');
  console.log('=========================================');
};

/**
 * Mencetak rincian beban listrik manifest grid yang berhasil dialiri daya listrik secara aman.
 * @param {Map<string, GridLoad>} matchedList 
 */
GridView.prototype.displayMatchedLoads = function(matchedList){
  console.log(`✅ ENERGIZED: [ ${matchedList.size} ${matchedList.size > 1 ? 'Loads' : 'Load'} successfully powered by this transformer ]`);
  console.log('-----------------------------------------------------');
  for (const data of matchedList.values()){
    console.log(`- ID          : ${data.id}`);
    console.log(`  Type        : ${data.type}`);
    console.log(`  Zone        : ${data.zone}`);
    console.log(`  Demand      : ${data.demandKW} KW`);
    if (data instanceof ResidentialLoads){
      console.log(`  Peak Hour   : ${data.peakHour.toString().padStart(2, '0')}.00`)
    } else if (data instanceof IndustrialLoads){
      console.log(`  High Voltage: ${data.requiresHighVoltage ? 'YES' : 'NO'}`);
    }
    console.log('-----------------------------------------------------');
  }
};

GridView.prototype.displayUnmatchedLoads = function(){
  console.log(`❌ BLACKOUT: No grid loads fit this transformer specifications or capacity limits.`);
};

/**
 * @param {string} message - Pesan error detail pelanggaran input.
 */
GridView.prototype.invalidInput = function(message){
  console.log(`INVALID INPUT! ${message}`)
};

GridView.prototype.displayExitLog = function(){
  console.log('Thank you for using Smart Grid System. Goodbye!');
};

// =========================================================================
// 4. INTERACTION PROMPT VIEW LAYER (PEMBACA INPUT KEYBOARD)
// =========================================================================

/**
 * @constructor PromptView
 * @description Mengurusi penangkapan teks mentah secara sinkron melalui readline-sync.
 */
function PromptView(){}

/**
 * @param {Array<string>} types - Opsi tipe trafo resmi yang tersedia. 
 * @returns {string} String UPPERCASE hasil pembersihan input user.
 */
PromptView.prototype.GridTypeInput = function(types){
  return rl.question(`Enter Transformer Type (${types.join('/')}): `).trim().toUpperCase();
};

/**
 * @returns {number} Angka kapasitas hasil konversi input user.
 */
PromptView.prototype.maxCapacityInput = function(){
  return Number(rl.question('Enter Transformer Maximum Capacity (KW): '));
};

/**
 * @returns {string} String UPPERCASE konfirmasi kelanjutan program.
 */
PromptView.prototype.exitPrompt = function(){
  return rl.question('Press Enter to connect another transformer, or type "exit" to quit: ').trim().toUpperCase();
}

// =========================================================================
// 5. CONTROLLER LAYER (ORCHESTRATOR OPERASIONAL ALUR KEPUTUSAN)
// =========================================================================

/**
 * @constructor GridController
 * @description Manajer alur keputusan utama. Membaca input, meminta penyaringan berat di model,
 * mencocokkan tipe beban di level controller, dan menginstruksikan cetakan output ke view.
 */
function GridController(){
  this._model = new GridModel();
  this._view = new GridView();
  this._prompt = new PromptView();
  
  this._model.generateResidentialLoads(residentialLoads);
  this._model.generateIndustrialLoads(industrialLoads);
}

/**
 * Memvalidasi apakah tipe trafo yang dimasukkan terdaftar secara resmi.
 * @returns {string} String tipe trafo yang sah ('DISTRIBUTION' / 'SUBSTATION').
 */
GridController.prototype.validateGridTypeInput = function(){
  const allowedTypes = ['DISTRIBUTION', 'SUBSTATION']
  while(true){
    const GridTypeInput = this._prompt.GridTypeInput(allowedTypes);
    if (GridTypeInput !== 'DISTRIBUTION' && GridTypeInput !== 'SUBSTATION'){
      this._view.invalidInput('Please Enter the correct input.');
      continue;
    }
    return GridTypeInput;
  }
};

/**
 * Memvalidasi besaran kapasitas pengiriman agar tidak melewati batas fisik aman jenis trafo.
 * @param {string} typeInput - Tipe trafo yang telah divalidasi.
 * @returns {number} Nilai kapasitas numerik bersih yang valid.
 */
GridController.prototype.validateMaxCapacityInput = function(typeInput){
  while (true){
    const maxCapacityInput = this._prompt.maxCapacityInput();
    if (isNaN(maxCapacityInput) || maxCapacityInput <= 0){
      this._view.invalidInput('Please enter correct input.');
      continue;
    }
    if (typeInput === 'DISTRIBUTION'){
      if (maxCapacityInput > 500){
        this._view.invalidInput(`Your input exceed limit of 500 KW for this ${typeInput} transformer`);
        continue;
      }
    }
    if (typeInput === 'SUBSTATION'){
      if (maxCapacityInput > 50000){
        this._view.invalidInput(`Your input exceed limit of 50000 for this ${typeInput} transformer`);
        continue;
      }
    }
    return maxCapacityInput;
  }
};

/**
 * Menghubungkan sub-Map terfilter kapasitas dari model untuk disaring ulang berdasarkan
 * aturan kecocokan jenis trafo dan tipe objek instansiasi.
 * @param {string} typeInput - Tipe trafo pangkalan.
 * @param {number} maxCapacityInput - Daya maksimal trafo.
 * @returns {Map<string, GridLoad>} Hasil Map final beban yang aman dialiri energi.
 */
GridController.prototype.matchingLoadAndTransformer = function(typeInput, maxCapacityInput){
  const filteredList = this._model.filterLoadLList(maxCapacityInput);
  const matchedData = new Map();

  for (const [id, data] of filteredList){
    let isTypeMatch = false;

    if (typeInput === 'DISTRIBUTION' && data instanceof ResidentialLoads){
      isTypeMatch = true;
    } else if (typeInput === 'SUBSTATION' && data instanceof IndustrialLoads){
      isTypeMatch = true;
    }
    if (isTypeMatch){
      matchedData.set(id, data)
    }
  }
  return matchedData;
};

/**
 * Menangkap dan mengevaluasi status penutupan aplikasi.
 * @returns {boolean} Status bendera penanda keluar program.
 */
GridController.prototype.isExit = function(){
  let isExit = false
  const exitInput = this._prompt.exitPrompt();
  if (exitInput === 'EXIT'){
    isExit = true;
  }
  return isExit;
};

/**
 * Pintu masuk utama (Entry Point) pengeksekusi loop operasional aplikasi Smart Grid.
 */
GridController.prototype.initialize = function(){
  while (true){
    this._view.displayTitle();
    const typeInput = this.validateGridTypeInput();
    const maxCapacityInput = this.validateMaxCapacityInput(typeInput);
    const matchedGrids = this.matchingLoadAndTransformer(typeInput, maxCapacityInput);
    console.log('');
    
    if (matchedGrids.size === 0){
      this._view.displayUnmatchedLoads();
    } else {
      this._view.displayMatchedLoads(matchedGrids);
    }
    console.log('');

    if (this.isExit()){
      console.log('');
      this._view.displayExitLog();
      break;
    }
    console.log('');
  }
};

// =========================================================================
// DATA MOCK SEEDING
// =========================================================================

/** @type {Array<Object>} */
const residentialLoads = [
  { id: 'RES-01', zone: 'Cluster A', demandKW: 5, peakHour: 18 },
  { id: 'RES-02', zone: 'Cluster B', demandKW: 12, peakHour: 20 }
];

/** @type {Array<Object>} */
const industrialLoads = [
  { id: 'IND-01', zone: 'Kawasan Industri M21', demandKW: 2500, requiresHighVoltage: true },
  { id: 'IND-02', zone: 'Kawasan Industri MM200', demandKW: 6000, requiresHighVoltage: false }
];

// Pipeline Execution
const controller = new GridController();
controller.initialize();