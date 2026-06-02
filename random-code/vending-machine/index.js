const rl = require('readline-sync');

function Product(id, stock){
    this.id = id;
    this.stock = stock;
    this.buy = function(amount){
        this.stock -= amount;
    }
    this.restock = function(amount){
        this.stock += amount;
    }
}

function ProductController(){
    this.products = [];
    this.generateProducts = function(count){
        for (let i = 0; i < count; i++){
            const product = new Product(i, 10);
            this.products.push(product);
        }
    }
    this.findProduct = function(id){
        for (let i = 0; i < this.products.length; i++){
            const product = this.products[i];
            if (product.id === id){
                return product;
            }
        }
        return undefined;
    }
}

const Menu = {
    CHECK_STOCK: 1,
    BUY_DRINK: 2,
    RESTOCK: 3,
    EXIT: 4,
}

function logMenu(){
    console.log(`Main menu
1: check stock
2: buy drink
3: restock
4: exit`)
}

const productController = new ProductController();
productController.generateProducts(10);

while(true){
    const productId = +rl.question('Enter a slot ID: ');
    const product = productController.findProduct(productId);

    if (!product){
        console.log('Invalid slot ID! Please try again.\n');
        continue;
    }

    console.log('');

    let choice;

    do{
        logMenu();
        choice = +rl.question('Enter a choice: ');
        
        switch (choice){
            case Menu.CHECK_STOCK:
                console.log(`The stock is ${product.stock}`);
                break;
            case Menu.BUY_DRINK:
                const bought = +rl.question('Enter an amount to buy: ');
                if (bought > product.stock){
                    console.log(`Product that you bought exceeded stock. The product stock only has ${product.stock}`);
                    break;
                }
                product.buy(bought);
                break;
            case Menu.RESTOCK:
                const restocked = +rl.question('Enter an amount to restock: ');
                product.restock(restocked);
                break;
        }
 
        console.log('');
    } while(choice !== Menu.EXIT)
}