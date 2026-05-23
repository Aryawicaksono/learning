const readline = require('readline-sync');

let list1= [];
let list2= [];
let mainList = [];
let results = '';

function fillArray(fillerArray, filledArray){
    for (let i = 0; i < fillerArray.length; i++){
        filledArray.push(fillerArray[i])
    };
};

while (true){
    const inputList1 = readline.question('Enter list1: ');
    const inputList2 = readline.question('Enter list2: ');

    function isValid(array){
        for (let i = 0;  i < array.length; i++){
            if (array[i] === ''){
                return false;
            };
        };
        return true;
    };

    list1 = inputList1.split(' ');
    list2 = inputList2.split(' ')

    if (!isValid(list1) || !isValid(list2)){
        console.log('Input cannot empty! Please try again.\n');
        continue;
    };

    break;
};

fillArray(list1, mainList);
fillArray(list2, mainList);

for (let i = 0; i < mainList.length; i++){

    for (let j = 0; j < mainList.length - 1; j++ ){
        if ( +mainList[j] > +mainList[j + 1]){
            let container = mainList[j];
            mainList[j] = mainList[j + 1];
            mainList[j + 1] = container;
        };
    };
};


for (let i = 0; i < mainList.length; i++){
    if (i === mainList.length - 1){
        results += mainList[i];
    } else{
    results += mainList[i] + ' ';
    };
};

console.log(`The merge list is ${results}.`);