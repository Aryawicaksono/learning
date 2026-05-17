const readline = require('readline-sync');

const initialPrice = +readline.question('Initial car price: ');
const annualDepreciation = +readline.question('Annual depreciation rate (%): ') / 100;
const projectYear = +readline.question('Years to project:');

function rounded (num){
    return Number(num).toFixed(2);
}

for (let year = 1; year <= projectYear; year++){
    const result = initialPrice * (1 - annualDepreciation)**year;

    console.log(`Year ${year}, current value: ${rounded(result)}`);
};
// Initial car price: 250000000
// Annual depreciation rate (%): 12
// Years to project: 8

// Year 1, current value: 220000000.00
// Year 2, current value: 193600000.00
// Year 3, current value: 170368000.00
// ...
// Year 8, current value: 89908308.27