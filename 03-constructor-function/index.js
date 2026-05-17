const readline = require('readline-sync');

function City (name,uniqueness){
    this.name = name;
    this.uniqueness = uniqueness;
    this.describe = function (){
        return `Ini adalah kota ${this.name} dengan ciri khas ${this.uniqueness}`;
    };
}

const name = readline.question('Masukkan nama kota: ');
const uniqueness = readline.question ('Masukkan ciri khas kota: ');

const city = new City(name,uniqueness);

console.log(city.describe());