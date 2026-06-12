const warehouseStock = new Map([
  [101, 50],
  [102, 30],
  [103, 15]
])

const todaySales = new Map([
  [101, 5],
  [103, 10]
])

function updateWareHouseStock(warehouseStock, storeSales){

  for (const stock of warehouseStock){
    const id = stock[0];
    const lastStock = stock[1];

    const soldStock = storeSales.get(id);

    let currentStock;

    if (currentStock !== undefined){
      const newStock = currentStock - soldStock;
      warehouseStock.set(id, newStock);
    }
  }
}

updateWareHouseStock(warehouseStock, todaySales);

console.log(warehouseStock.get(101));
console.log(warehouseStock.get(102));
console.log(warehouseStock.get(103));