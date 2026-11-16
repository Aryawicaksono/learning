const readline = require('readline-sync');

let numbers = [];
let rawNumbers = [];
let count = 1;

while (true){
    let isValid = true;
    const input = readline.question('Enter the integers between 1 and 100: ');
    rawNumbers = input.split(' ');
    numbers = [];

    for (let i = 0; i < rawNumbers.length; i++){
        if (rawNumbers[i] !== ''){
            numbers.push(rawNumbers[i]);
        };
    };
    if (numbers.length === 0){
        console.log('Input tidak boleh kosong! Coba lagi.\n');
        continue;
    };

    for (let i = 0; i < numbers.length; i++){   
        if (isNaN(numbers[i])){
            console.log('Input harus angka! Coba lagi.\n');
            isValid = false;
            break;
        } else if (+numbers[i] < 1 || +numbers[i] > 100){
            console.log('Input harus berada di rentang 1 sampai 100! Coba lagi.\n');
            isValid = false;
            break;
        };
    };
    if (!isValid){
        continue;
    };

    break;
};

for (let i = 0; i < numbers.length; i++){
    for (let j = 0; j < numbers.length - 1; j++){
        if ( +numbers[j] > +numbers[j + 1]){
            let container = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = container;
        };
    };
};

console.log(rawNumbers);
for (let i = 0; i < numbers.length; i++){
    if (numbers[i] === numbers[i + 1]){
        count++;
    } else{
        let label = count === 1? "time" : "times";
        console.log(`${numbers[i]} occurs ${count} ${label}`);
        count = 1;
    };
};