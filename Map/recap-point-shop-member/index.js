const userAndi = {id: 101, name: 'Andi'};
const userBudi = {id: 102, name: 'Budi'};
const userCici = {id: 103, name: 'Cici'};

const currentTransaction = new Map([
  [userAndi, 55000],
  [userBudi, 20000],
  [userCici,9500]
])

function recapPointMember(transactionList){
  const pointReport = new Map();
  const POINT = 1 / 10000; 
  let point;
  for (const [person, transaction] of transactionList){
    const point = Math.floor(transaction * POINT)
    pointReport.set(person, point)
  }
  return pointReport;
}

const report = recapPointMember(currentTransaction);

console.log(report.get(userAndi));
console.log(report.get(userBudi));
console.log(report.get(userCici));