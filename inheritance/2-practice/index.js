function Package(id, type, destination, weight){
  Object.defineProperties(this,{
    id: {value: id, enumerable: true, configurable: true},
    type: {value: type, enumerable: true, configurable: true},
    destination: {value: destination, enumerable: true, configurable: true},
    weight: { value: weight, enumerable: true, configurable: true},
  })
}
Package.prototype.isVehicleMatch = function(vehicleType){
  return false;
}

function ExpressPkg (id, destination, weight, expiryHours){
  Package.call(this, id, 'express', destination, weight);
  this.expiryHours = expiryHours;
}
ExpressPkg.prototype = Object.create(Package.prototype, {
  constructor: {
    value: ExpressPkg,
    writable: true,
    enumerable: false,
    configurable: true,
  }
});
ExpressPkg.prototype.isVehicleMatch = function(vehicleType){
  return vehicleType === 'VAN'|| vehicleType ===  'MOTORCYCLE';
};

function HeavyPkg(id, destination, weight, isRequireCrane){
  Package.call(this, id, 'heavy', destination, weight);
  this. isRequireCrane = isRequireCrane;
}
HeavyPkg.prototype = Object.create(Package.prototype, {
  constructor: {
    value: HeavyPkg,
    writable: true,
    enumerable: false,
    configurable: true,
  }
});
HeavyPkg.prototype.isVehicleMatch = function(vehicleType){
  return vehicleType === 'BIG TRUCK';
};

const package1 = new ExpressPkg('EXP-01', 'Jakarta', 5, 6);
const package2 = new HeavyPkg('HVY-01', 'Balikpapan', 500, true);
const package3 = new ExpressPkg('EXP-02', 'Semarang', 10, 10);
const package4 = new ExpressPkg('EXP-05', 'Bali', 5, 12);
const package5 = new HeavyPkg('HVY-03', 'Maumere', 10000, true);
const package6 = new HeavyPkg('HVY-09', 'Lampung', 500, false);
const package7 = new HeavyPkg('HVY-10', 'Solo', 250, false);

const packageList = Array.of(package1,package2,package3,package4,package5,package6,package7);
const expressPackages = [];
const heavyPackages = [];
for (const package of packageList){
  if (package instanceof ExpressPkg){
    expressPackages.push(package);
  } else if (package instanceof HeavyPkg){
    heavyPackages.push(package)
  }
}
// console.log('Express Packages:')
// console.log(expressPackages);
// console.log('Heavy Packages:')
// console.log(heavyPackages);

for (const package of packageList){
  if (package.isVehicleMatch('VAN')){
    console.log(package)
  }
}