const rl = require('readline-sync');

class StorageSlot{
  constructor(id,zone){
    Object.defineProperties(this,{
      id:{
        value: id,
        enumerable: true,
        configurable: true,
      },
      zone:{
        value: zone,
        enumerable: true,
        configurable: true,
      },
    })
    this.isOccupied = false;
    this.currentLoad = 0;
  }
}

class ColdStorage extends StorageSlot{
  constructor(id, temperature){
    super(id, 'cold');
    this.temperature = temperature || -15;
  }
}

class DryStorage extends StorageSlot{
  constructor(id, maxWeight){
    super(id, 'dry')
    this.maxWeightLimit = maxWeight;
  }
}

class WareHouseModel{
  constructor(){
    this._dataSlots = new Map();
  };
  generateColdStoreageSlots(coldStorages){
    for (const coldStorageData of coldStorages ){
      const coldStorages = new ColdStorage(coldStorageData.id, coldStorageData.temperature)
      this._dataSlots.set(coldStorages.id, coldStorages);
    }
  };
  generateDryStorageSlots(dryStorages){
    for (const dryStorageData of dryStorages ){
      const dryStorage =  new DryStorage(dryStorageData.id, dryStorageData.maxWeight)
      this._dataSlots.set(dryStorage.id, dryStorage)
    }
  };
  getStorageSlot(id){
    return this._dataSlots.get(id);
  };
  hasStorageSlot(id){
    return this._dataSlots.has(id)
  };
  [Symbol.iterator](){
    const slotValue = this._dataSlots.values();
    return {
      next(){
        return slotValue.next();
      }
    }
  };
}

class WarehouseView{
  displayMenu(){
    console.log('Menu');
    console.log('1. Check Slot Status');
    console.log('2. Store Items');
    console.log('3. Release Slot');
    console.log('4. Exit');
    console.log('-'.repeat(20))
    console.log('');
  };
  displayWareHouseSlot(storageSlot){
    console.log(`ID: ${storageSlot.id}`);
    console.log(`STATUS: ${!storageSlot.isOccupied ? 'Empty' : `Occupied (${storageSlot.currentLoad} kg)` }`);
    if (storageSlot instanceof ColdStorage){
      console.log(`TEMPERATURE: ${storageSlot.temperature} Celcius`);
    } else if (storageSlot instanceof DryStorage){
      console.log(`MAX WEIGHT: ${storageSlot.maxWeightLimit} kg`);
    }
  };
  displayInvalidInputId(inputId){
    console.log(`Slot with id "${inputId} cannot found!`);
  };
  displayInvalidChoiceInput(){
    console.log('Please enter the correct choice!');
  };
  displaySuccessStore(loadInput){
    console.log(`Success to store items with current load of ${loadInput} kg!`);
  };
  displayInvalidLoad(reason){
    console.log(`Failed to load: ${reason}`)
  };
  displayInvalidStore(){
    console.log('This Slot is Occupied');
  };
  displaySuccessRemove(){
    console.log('This slot items has removed.');
  };
  displayInvalidRemove(){
    console.log('This slot is empty!');
  };
  displayExitLog(){
    console.log('Please input slot ID again...');
  };
}

class PromptView{
  idInput(){
    return rl.question('Please input slot id: ').trim().toUpperCase();
  };
  choiceInput(){
    return Number(rl.question('Select your choice: '))
  };
  loadInput(){
    return Number(rl.question('Fill amount of load: '));
  };
}

const Menu = Object.freeze({
  'CHECK_STATUS': 1,
  'STORE_ITEMS': 2,
  'RELEASE_SLOT': 3,
  'EXIT': 4,
});

class WareHouseController{
  constructor(coldData, dryData){
    this._model = new WareHouseModel();
    this._view = new WarehouseView();
    this._promptView = new PromptView();
    this._model.generateColdStoreageSlots(coldData);
    this._model.generateDryStorageSlots(dryData);
  }
  validateIdInput(){
    while(true){
      const idInput = this._promptView.idInput();
      if (!this._model.hasStorageSlot(idInput)){
        this._view.displayInvalidInputId(idInput);
        continue;
      }
      return idInput;
    }
  };
  validateLoadInput(storageSlot){
    let maxWeight;

    if (storageSlot instanceof ColdStorage){
      maxWeight = Infinity;
    } else if (storageSlot instanceof DryStorage){
      maxWeight = storageSlot.maxWeightLimit;
    }
    while(true){
      const loadInput = this._promptView.loadInput();
      if (isNaN(loadInput) || loadInput <= 0){
        this._view.displayInvalidLoad('Please enter correct number.');
        continue;
      }
      if (loadInput > maxWeight){
        this._view.displayInvalidLoad('The amount of items is overload.');
        continue;
      }
      return loadInput;
    }
  };
  start(){
    while (true){
    const idInput = this.validateIdInput();
    const storageSlot = this._model.getStorageSlot(idInput);
    let choice;
    do {
      this._view.displayMenu()
      choice = this._promptView.choiceInput();
      console.log('')
      switch (choice){
        case Menu.CHECK_STATUS:
          this._view.displayWareHouseSlot(storageSlot);
          break;
        case Menu.STORE_ITEMS:
          if (storageSlot.isOccupied){
            this._view.displayInvalidStore();
          } else {
            const loadInput = this.validateLoadInput(storageSlot);
            storageSlot.isOccupied = true;
            storageSlot.currentLoad = loadInput;
            this._view.displaySuccessStore(loadInput);
          }
          break;
        case Menu.RELEASE_SLOT:
          if(!storageSlot.isOccupied){
            this._view.displayInvalidRemove();
          } else {
            storageSlot.currentLoad = 0;
            storageSlot.isOccupied = false;
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
    } while (choice !== Menu.EXIT)
    }
  };
}

const coldSlots = [{id: 'ZONE-A01', temperature: -20}, {id: 'ZONE-A02'}, {id: 'ZONE-A03', temperature: -10}];
const drySlots = [{id: 'ZONE-B01', maxWeight: 1000}, {id: 'ZONE-B02', maxWeight: 500}, {id: 'ZONE-B03', maxWeight: 1500}]

const controller = new WareHouseController(coldSlots, drySlots)
controller.start();