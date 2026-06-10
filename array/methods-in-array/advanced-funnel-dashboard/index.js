const successTransactions = [
  { buyer: "Siti", productType: "Canva Template", price: 25 },
  { buyer: "Andi", productType: "E-book", price: 10 },
  { buyer: "Budi", productType: "Canva Template", price: 25 },
  { buyer: "Siti", productType: "E-book", price: 15 }, // <-- Siti beli lagi
  { buyer: "Rian", productType: "Flashcard", price: 20 }
];

const buyers = successTransactions.map(transaction => transaction.buyer)
const uniqueBuyers = buyers.filter((buyer, index) =>{
  return buyers.indexOf(buyer) === index;
})


const revenueByCategory = successTransactions.reduce((total, transaction) => {
  const category = transaction.productType;

  if (!total[category]){
    total[category] = 0;
  }

  total[category] += transaction.price;
  return total;
}, {});

console.log("=== DAFTAR PELANGGAN UNIK ===");
console.log(uniqueBuyers);

console.log("\n=== TOTAL PENDAPATAN PER KATEGORI ===");
console.log(revenueByCategory);