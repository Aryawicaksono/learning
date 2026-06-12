const storeInventory = new Map([
  ['Smartphone', 699],
  ['Wireless Mouse', 25],
  ['Gaming Laptop', 1200],
  ['Keyboard', 45],
  ['Monitor 4K', 450]
]);

function checkDiscountEligibiliy(productDatabase){
  for (const [product, price ] of productDatabase){
    if (price > 500){
      console.log(`Promo Alert: ${product} qualifies for the Premium Discount!`);
    }
  }
}

checkDiscountEligibiliy(storeInventory);