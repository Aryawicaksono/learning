const readline = require('readline-sync');

const holderName = readline.question('Enter card owner name: ');
const targetPoint = +readline.question('Enter target points for Premium Tier: ');

function Card(name,target){
    this.name = name;
    this.target = target;
    this.currentPoint = 0;
    this[Symbol.toPrimitive] = function(hint){
        if (hint === 'number'){
            return this.currentPoint;
        };
        return this.name;
    };
};

const card1 = new Card(holderName,targetPoint);

console.log('\n--- Smart Loyalti Card Terminal (BUY / REFUND /EXIT) ---\n');

while (true){
    const input = readline.question('Choose action: ');
    let action = input.toUpperCase();

    if (action === 'EXIT'){
        console.log('');
        break;
    };
clearInterval
    if (action !== 'BUY' && action !== 'REFUND'){
        continue;
    };

    if (action === 'BUY'){
        card1.currentPoint += 30;
        console.log('Transaction recorded! You earned 30 points.\n');
    } else if ( action === 'REFUND'){
        card1.currentPoint -= 15;

        if ( card1 <= 0){
            card1.currentPoint = 0;
        };
        console.log(`Refund recorded! Lost 15 points. Current points: ${card1.currentPoint}\n`);
    };

    if ( card1 >= card1.target){
        console.log(`CONGRATULATIONS! ${card1.name.toUpperCase()}'s card has been upgraded to PREMIUM TIER!\n`);
        break;
    };
};

console.log('--- Final Report ---');
console.log(`Card Holder: ${card1.name.toUpperCase()}`);
console.log(`Final Points Balance: ${+card1}`);