const gymdatabase = new Map([
  ['Alex', 'Active'],
  ['Berta', 'Expired'],
  ['Charlie', 'Active'],
  ['David', 'Expired']
])

const currentGuests = ['Alex', 'Berta', 'Charlie'];

function processCheckIn(database, guests){
  for (const [name, status] of database){
    if (guests.includes(name)){
      if (status === 'Active'){
        console.log(`Welcome ${name}! Access granted.`)
      } else [
        console.log(`${name}'s membership is expired! acces denied`)
      ]
    }
  }
}

processCheckIn(gymdatabase, currentGuests);