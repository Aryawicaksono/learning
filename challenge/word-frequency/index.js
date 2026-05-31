const readline = require('readline-sync');

function parseString(str){
    const strs = str.split(' ');
    const strings = [];

    for (let i = 0; i < strs.length; i++){
        const string = String(strs[i]).toLowerCase();
        strings.push(string);
    }

    return strings;
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

function sortKey(object){
    const sortedKeys = [];
    for (const key in object){
        sortedKeys.push(key);
    }

    for (let i = 0; i < sortedKeys.length; i++){
        for (let j = i + 1; j < sortedKeys.length; j++){
            if (sortedKeys[i] > sortedKeys[j]){
                let container = sortedKeys[i];
                sortedKeys[i] = sortedKeys[j];
                sortedKeys[j] = container;
            }
        }
    }
    return sortedKeys;
}

const strings = parseString(readline.question('Enter a sentence: '));

const occurences = buildOccurences(strings);

const sortedOccurencesKey = sortKey(occurences);

for (let i = 0; i < sortedOccurencesKey.length; i++){
    const sortedString = sortedOccurencesKey[i];
    const occurence = occurences[sortedString];

    if (occurence === 1) {
        console.log(`${sortedString} occurs ${occurence} time`);
    } else {
        console.log(`${sortedString} occurs ${occurence} times`);
    }
}