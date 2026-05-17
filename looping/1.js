const readline =require('readline-sync');

const initialSubscriber = +readline.question('Initial subscribers: : ');
const growthRatePercent = +readline.question('Annual growth rate: ') / 100;
const yearProject = +readline.question('Years to project:');

function rounded (num) {
    return Math.round(num);
}

console.log();

for(let year = 1; year <= yearProject; year++){
    const result = initialSubscriber * (1 + growthRatePercent)**year;
    console.log(`Year ${year}, current value ${rounded(result)}`);
}