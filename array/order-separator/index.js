const readline = require('readline-sync');

const input = readline.question('Enter your orders (separated by comma): ');
const orders = input.split(',').map(order => order.trim());

console.log('\n--- Processing Orders ---');
console.log(`Successfully imported ${orders.length} items to your cart.\n`);
console.log('--- Receipt Details ---');

let totalBill = 0;

for( let i = 0; i < orders.length; i++){
    const menu = orders[i].toUpperCase();
    let price;

    if (menu === 'KOPI'){
        price = 15000;
    } else if ( menu === 'ES TEH'){
        price = 5000;
    } else {
        price = 10000;
    };

    totalBill += price;
    console.log(`${i + 1}. ${menu} - Rp ${price}`);
};

console.log(`Total items: ${orders.length}`)
console.log(`Total Bill: ${totalBill}`)

// Enter your orders (separated by comma): Kopi, Es Teh, Roti, Donat, Kopi

// --- Processing Orders ---
// Successfully imported 5 items to your cart.

// --- Receipt Details ---
// 1. KOPI - Rp 15.000
// 2. ES TEH - Rp 5.000
// 3. ROTI - Rp 10.000
// 4. DONAT - Rp 10.000
// 5. KOPI - Rp 15.000

// Total Items: 5
// Total Bill: Rp 55.000