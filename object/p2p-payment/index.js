const readline = require('readline-sync');

const buyerName = readline.question('Enter User name: ');
const buyerBalance = +readline.question('Enter User initial balance: ');
const sellerName = readline.question('Enter Merchant name: ');
const sellerBalance = +readline.question('Enter Merchant initial balance: ');

function Wallet(name,balance){
    this.name = name;
    this.balance = balance;
    this.transfer = function(targetWallet, amount){
        this.balance -= amount;
        targetWallet.balance += amount;
    };
    this[Symbol.toPrimitive] = function(hint){
        if (hint === 'number'){
            return this.balance;
        };
        return this.name;
    };
};

function runPaymentTerminal (senderWallet, receiverWallet){
    console.log('\n--- P2P Payment Terminal (PAY / CHECK / EXIT) ---');
    
    while (true){
            const input = readline.question('\nChoose action:');
            const action = input.toUpperCase();

        if (action === 'EXIT'){
            break;
        };
        if ( action !== 'PAY' && action !== 'CHECK'){
            continue;
        };
        if (action === 'PAY'){
            const amount = +readline.question('Enter amount to pay: ');

            if ((amount + 2500) > senderWallet){
                console.log('Transaction denied! Insufficient balance for amount + Rp 2500 admin fee.');
            } else {
                senderWallet.transfer(receiverWallet,amount);
                senderWallet.balance -= 2500;
                console.log(`Payment successful! Rp ${amount} transferred to ${receiverWallet.name}.`);
                console.log('(Admin fee of Rp 2500 applied)');
                if (senderWallet <= 5000){
                    console.log(`Warning: ${senderWallet.name}'s balance is critically low! Remaining: Rp ${+senderWallet}`);
                };
            };
        } else if (action === 'CHECK'){
            console.log('--- Current Balance Status ---');
            console.log(`1. ${senderWallet.name.toUpperCase()}: Rp ${+senderWallet}`);
            console.log(`2. ${receiverWallet.name.toUpperCase()}: Rp ${+receiverWallet}`);
        };
    };
};

const buyerWallet = new Wallet(buyerName,buyerBalance);
const sellerWallet = new Wallet (sellerName,sellerBalance);

runPaymentTerminal(buyerWallet,sellerWallet);

console.log('\n--- Final Report ---');
console.log(`Sender (${buyerWallet.name}) Final Balance: Rp ${+buyerWallet}`);
console.log(`Receiver (${sellerWallet.name}) Final Balance: Rp ${+sellerWallet}`);