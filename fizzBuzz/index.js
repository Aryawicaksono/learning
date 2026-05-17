const readline = require('readline-sync');

const countFizzBuzz = +readline.question('Write how many fizz buzz: ');

function verifyFizzBuzz(num) {
    if(count % 3 === 0 && count % 5 === 0) {
        return 'fizzBuzz';
    };
    if (count % 3 === 0){
        return 'fizz';
    };
    if (count % 5 === 0) {
         return 'buzz';
    };

return String(num);
};

let count = 1;

while ( count <= countFizzBuzz){
    const result = generateFizzBuzz(count);
    console.log(result);
    count++;
};