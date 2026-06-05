const readline = require('readline-sync');

function Menu(id, name, price){
  this.id = id;
  this.name = name;
  this.price = price;
}

function Table(id){
  this.id = id;
  this.status = false;
  this.order = [];
}

function MenuController(){
  this.menus = [];
  this.generateMenu = (menus) => {
    menus.forEach(menu =>{
      const item = new Menu(menu.id, menu.name, menu.price);
      this.menus.push(item);
    });
    return this.menus;
  }
  this.findMenu = (id) => {
    let targetMenu = {};
    this.menus.forEach(menu =>{
      if (menu.id === id){
        targetMenu = menu
      }
    });
    return targetMenu;
  }
}

function TableController(){
  this.tables = [];
  this.generateTables = (tables) => {
    tables.forEach(table => {
      const item = new Table(table.id);
      this.tables.push(item);
    });
    return this.tables;
  }
  this.findTable = (id) => {
    let targetTable;
    this.tables.forEach(table => {
      if (table.id === id){
        targetTable = table
      }
    });
    return targetTable;
  }
}

const MainMenu = {
  VIEW_RESTAURANT_STATUS: 1,
  VIEW_MENU: 2,
  ORDER_FOOD: 3,
  PAY_BILL: 4,
  EXIT: 5,
}
const menuData = [
  {id: 0, name: 'Nasi Goreng', price: 15,}, 
  {id: 1, name: 'Ayam Goreng', price: 12,}, 
  {id: 1, name: 'Es Teh Manis', price: 3,}
];
const tableData = [ {id: 0}, {id: 2}];

function joinString(array){
  let str = '';
  array.forEach((element,index) => {
      str += `${element}, `;
    });

  return str.slice(0, -2);
}

function logMenu(){
  console.log(`Main Menu:
1. View Restaurant Status
2. Order Food
3. Checkout / Pay Bill
4. Exit`);
}

const menuController = new MenuController();
const tableController = new TableController();
const menus = menuController.generateMenu(menuData);
const tables = tableController.generateTables(tableData);
let choice;

do{
  let targetTable;
  let targetMenu;

  console.log('');

  choice = +readline.question('Enter choice: ');

  switch (choice) {
    case MainMenu.VIEW_RESTAURANT_STATUS:
      console.log('--- Restaurant Tables ---');
      tables.forEach(table => {
        let status;
        if (!table.status){
          status = 'Empty';
        } else {
          status = 'Occupied';
        }
        const orderMenus = [];
        let orderStatus;

          if (table.order.length === 0){
            orderStatus = 'None';
            continue;
          }
          table.order.forEach( menu => {
            orderMenus.push(menu.name);
          })
          orderStatus = `[ ${joinString(orderMenus)} ]`

          console.log(`Table: ${table.id} | Status: ${status} | Orders: ${orderStatus}`)
      })
  }

} while (choice !== MainMenu.EXIT)

console.log('\nThank you for your order and come again.');
