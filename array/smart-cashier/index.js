const readline = require('readline-sync');

const MENU_DATABASE = {
    KOPI : 15000,
    'ES TEH' : 5000,
    ROTI : 10000,
    DONAT : 8000
};
const input = readline.question('Enter your orders (separated by comma): ');
const orders = input.split(',').map(order => order.trim());
const shoppingCart = [];

function CartItem(item,price){
    this.item = item;
    this.price = price;
};

console.log('\n --- Processing Orders ---');

for (let order = 0; order < orders.length; order++){
    const menuName = orders[order].toUpperCase();
    const itemPrice = MENU_DATABASE[menuName];
    
    if (itemPrice !== undefined){
        const item = new CartItem(menuName, itemPrice);
        shoppingCart.push(item);
    } else {
      console.log(`Menu ${menuName} tidak tersedia! Silakan pesan menu lain.`)
    }
};

console.log(`\nSuccessfully imported ${shoppingCart.length} valid items to your cart.`);
console.log('\n--- Receipt Detail ---');

let totalPrice = 0;

for (const item of shoppingCart){
    console.log(`- ${item.item} - Rp ${item.price}`);
    totalPrice += item.price;
};

const tax = totalPrice * 0.1;

console.log(`\nSubtotal: Rp ${totalPrice}`);
console.log(`Tax (10%): Rp ${tax}`);
console.log(`Total Bill: Rp ${totalPrice + tax}`);