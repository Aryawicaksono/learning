const readline = require('readline-sync');

function parseNumbers(str) {
  const strs = str.split(' ');
  const numbers = [];

  for (let i = 0; i < strs.length; i++) {
    const number = +strs[i];
    numbers.push(number);
  }

  return numbers;
}

function locateLargestNumber(table) {
  let largestNumber = Number.NEGATIVE_INFINITY;
  let largestCoordinate;

  for (let row = 0; row < table.length; row++) {
    for (let col = 0; col < table[row].length; col++) {
      const number = table[row][col];

      if (number > largestNumber) {
        largestNumber = number;
        largestCoordinate = { row, col };
      }
    }
  }

  return largestCoordinate;
}

const numbers = parseNumbers(readline.question('Enter the number of rows and columns in the array: '));
const rows = numbers[0];
const columns = numbers[1];

const table = [];

console.log('Enter the array:');

for (let row = 0; row < rows.length; row++) {
  let numbers;

  while (true) {
    numbers = parseNumbers(readline.question());
    if (numbers.length !== columns) {
      console.log(`Number count must match the required columns (${columns})`);
    } else {
      break;
    }
  }

  table.push(numbers);
}

const coordinate = locateLargestNumber(table);
console.log(`The location of the largest element is ${table[coordinate.row][coordinate.col]} at (${coordinate.row}, ${coordinate.col})`)
