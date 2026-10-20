'use strict';

function romanToInteger(str){
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }

  let result = 0;

  for (let i = 0; i < str.length; i++){
    let firstNum = map[str[i]];
    let secondNum = map[str[i+1]];

    if (secondNum > firstNum){
      result -= firstNum;
    } else {
      result += firstNum;
    }
  }
  return result;
}

console.log(romanToInteger('MCMXCIV'));