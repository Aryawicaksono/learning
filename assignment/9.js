const readline = require ('readline-sync');

const initialAmount = +readline.question('The amount investment: ');
const annualInterestRate = +readline.question('Annual interest rate: ') / 100;
const yearsToProject = +readline.question('Years to project: ')

const monthlyInterestRate = annualInterestRate /12;
const MONTH_IN_YEAR = 12;

function rounded(num){
    return Math.trunc(num * 100) /100;
};

for (let year = 1; year <= yearsToProject; year++){
    const value = initialAmount * (1 + monthlyInterestRate)**(MONTH_IN_YEAR * year);
    
    console.log(`Year ${year}, value: ${rounded(value).toFixed(2)}`);
    
};

