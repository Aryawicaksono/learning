class Wallet {
constructor(balance,cost){
    this.balance= balance;
    this.cost = cost;
    };
[Symbol.toPrimitive](hint) {
    return hint === 'number'? this.balance - this.cost : this.balance; 
};
};

const darmo = new Wallet(3000,500);
const gandhul = new Wallet(4000,2000)
console.log (darmo - gandhul);
console.log (`Darmo: ${darmo}\nGandhul: ${gandhul}`);