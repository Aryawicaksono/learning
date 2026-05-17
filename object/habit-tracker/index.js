const readline = require('readline-sync');

const habitName = readline.question('Enter habit name: ');
const targetPoint = +readline.question ('Enter target point to reach: ');

function Habit(name,point){
    this.name = name;
    this.targetPoint = point;
    this.currentPoint = 0;
    this[Symbol.toPrimitive] = function(hint){
        if (hint === 'number'){
            return this.currentPoint;
        };
        return this.name;
    };
};

const habit = new Habit(habitName,targetPoint);

console.log('--- Daily Habit Tracker (DONE / SKIP / EXIT) ---');

while (true){
    let input = readline.question('\nDid you do your habit today? ');
    let action = input.toUpperCase();
    
    if (action === 'EXIT'){
        break;
    }
    if (action !== 'DONE' && action !== 'SKIP'){
        console.log('Warning! Please write the correct input.');
        continue;
    }
    if (action === 'DONE'){
        habit.currentPoint += 10;
        console.log('Great job! You earned 10 points.');
    } else if (action === 'SKIP'){
        habit.currentPoint -= 5;
        if (habit <=0){
            habit.currentPoint = 0;
        };
        console.log(`It's okay to rest. Lost 5 points. Current point: ${habit.currentPoint} `);
    };
    if ( habit >= habit.targetPoint){
        console.log(`\nCONGRATULATIONS! You have reached your goal for ${habit.name.toUpperCase()}`);
        break;
    }
};
const name = habit.name.toUpperCase();

console.log('\n--- Final Report ---');
console.log(`Habit: ${name}`);
console.log(`Total Points Earned: ${+habit}`);