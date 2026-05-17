const readline = require('readline-sync');

const holderName = readline.question('Enter wallet holder name: ');
const initialBalance = +readline.question('Enter initial balance: ');
const transactionLimit = +readline.question('Enter transaction limit: ');

function Wallet(holderName,initialBalance,transactionLimit){
    this.holderName = holderName;
    this.balance = initialBalance;
    this.transactionLimit = transactionLimit;
    this[Symbol.toPrimitive] = function(hint){
        if(hint === 'number'){
            return this.balance;
        };
        return this.holderName;
    };    
};

const wallet = new Wallet(holderName,initialBalance,transactionLimit);

console.log("\n--- Transaction Mode (Type 'EXIT' to stop) ---\n");

while (true){
    let input = readline.question('Enter expense amount: ');
    if (input.toLocaleUpperCase() === 'EXIT'){
        break;
    };
    let expense = Number(input);

    if (expense <= 0 || isNaN(expense)){
        console.log('Invalid amount! Please enter a valid number.\n');
        continue;
    } else if (expense > wallet.transactionLimit){
        console.log('Transaction denied! Exceeds transaction limit.');
    } else if ( expense > wallet.balance){
        console.log('Transaction denied! Insufficient balance.\n');
    } else {
        wallet.balance -= expense;
        console.log('Transaction successful!');
        if (wallet <= 35000){
            console.log(
            `Warning: Your balance is low! Remaining: Rp ${wallet.balance}`);
        };
        console.log('');
    };
};
const name = wallet.holderName.toUpperCase();

console.log('--- Final Report ---');
console.log(`Holder: ${name}`);
console.log(`Final balance: Rp.${wallet.balance}`);