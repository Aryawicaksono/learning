const guest1 = {id: 101, name: 'Alice', roomNumber: '102-A'};
const guest2 = {id: 102, name: 'Bob', roomNumber: '305-B'};
const guest3 = {id: 103, name: 'Charlie', roomNumber: '204-C'};

const hotelBilling = new Map([
  [guest1, 1500],
  [guest2, 450],
  [guest3, 2100]
])

function grantVIPUpgrades(spendingDatabase){
  for (const [guest, bill] of spendingDatabase){
    if (bill > 1000){
      console.log(`VIP Alert: ${guest.name} from Room ${guest.roomNumber} has been upgraded to a Luxury Suite!\n`);
    }
  }
}

grantVIPUpgrades(hotelBilling);