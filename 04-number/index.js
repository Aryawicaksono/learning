//Penulisan number yang banyak
console.log(3_000_000);
console.log(3e6);
console.log(2e-3);
console.log();
//penulisan menggunakan radix
const num = 255;
console.log(num.toString(2));
console.log(255..toString(16));
console.log();
//penggunaan infinity dan NaN
console.log(Number(3e500));
console.log(5 / 0);
console.log(Infinity === Infinity);
console.log(isFinite(4e6));
console.log(isFinite(4e600));
console.log();
console.log(Math.sqrt(-1));
console.log(0 / 0);
console.log(+'qyfywf');
console.log(Number('gaf'));
console.log(NaN === NaN);
console.log(isNaN(Math.sqrt(-4)));
console.log();
//read with some string with number and non number (parseInt parseFloat)
console.log(Number('100'));
console.log(Number('100px'));
console.log(Number.parseInt('100px'));
console.log(Number.parseFloat('2.15cm'));
console.log(typeof Number.parseFloat('2.15cm'));
