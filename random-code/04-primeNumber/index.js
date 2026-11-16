const readline = require('readline-sync');

const countPrimeNumber = +readline.question('Enter count of first prime number: ');

function isPrimeNumber(num) {
    let divisor;

    if(num === 2){return true;};

    for (divisor = 2; divisor < num; divisor++){
        if (num % divisor === 0){
            return false;
        };
        return true;
    };
};

let count = 0;
let num = 2;

while (count < countPrimeNumber){
    if (isPrimeNumber(num)){
        console.log(num);
        count++;
    };
    num++
};