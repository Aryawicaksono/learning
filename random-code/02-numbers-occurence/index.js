const readline = require('readline-sync');

const numbers = {};

function parseIntegers(str){
    const strs = str.split(' ');
    const integers = [];

    for (let  i= 0; i < strs.length; i++){
        const integer = +strs[i];
        integers.push(integer);
    }   

    return integers;
}

function buildOccurences(values){
    const occurences = {};

    for (let i = 0; i < values.length; i++){
        const value = values[i];

        if (value in occurences){
            occurences[value]++;
        } else {
            occurences[value] = 1;
        }
    }
    return occurences;
}

const integers = parseIntegers(readline.question('Enter the integers between 1 and 100: '));

const occurences = buildOccurences(integers);

for (const integer in occurences){
    const occurence = occurences[integer];

    if (occurence === 1){
        console.log(`${integer} occurs ${occurence} time`);
    } else{
        console.log(`${integer} occurs ${occurence} times`);

    }
}