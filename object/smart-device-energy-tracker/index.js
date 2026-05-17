const readline = require('readline-sync');

const deviceName = readline.question('Enter device name: ');
const power = +readline.question('Enter power (in Watts): ');
const powerUsed = +readline.question('Enter hours used: ');

function Device(name,power,powerUsed){
    this.name = name;
    this.power = power;
    this.powerUsed = powerUsed;
    this.consumeEnergy = function(){
        const KILO = 1000;
        const totalKWH = (this.power * this.powerUsed) / KILO;
        return totalKWH
    };
}

const device = new Device(deviceName,power,powerUsed);

console.log('\n--- Device Report ---');
console.log(`Device Name: ${device.name}`);
console.log(`Power: ${device.power} Watts`);
console.log(`Usage Time: ${device.powerUsed} hours`);
console.log(`Total Energy Consumption: ${device.consumeEnergy()} kWh`);