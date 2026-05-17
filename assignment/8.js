const readline = require ('readline-sync');

const primeCount = +readline.question('Enter the number of prime numbers: ');

console.log (`The first ${primeCount} prime numbers are`);

let count = 0;

let number = 2;

while (count < primeCount){
    if (isPrimeNUmber(number)){
        console.log(number);
        count++;
    }
    number++;
}
// SIEVE OF ERASTHOTHENE
function isPrimeNUmber(number){
    for (let divisor =2; divisor <= number / 2; divisor++){
        if (number % divisor === 0){
            return false;
        }
    }
    return true;
}
