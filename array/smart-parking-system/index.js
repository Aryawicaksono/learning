const readline = require('readline-sync');

/**
 * =========================================================================
 * 1. CONSTRUCTOR FUNCTION (OBJECT BLUEPRINT)
 * =========================================================================
 * Used to instantiate uniform car objects to keep the data layer consistent.
 * Generates an object profile: { plateNum: 'STRING', type: 'REGULAR'/'VIP' }
 */
function Car(plateNum, type){
    this.plateNum = plateNum;
    this.type = type;
}

/**
 * =========================================================================
 * 2. HELPER FUNCTION (GUARD CLAUSE VALIDATOR)
 * =========================================================================
 * Evaluates whether the main parking lot array contains any elements.
 * Returns a Boolean (true/false) to cleanly short-circuit execution 
 * via 'continue' inside the switcher engine.
 */
function checkEmpty(parkingLot){
    if (parkingLot.length === 0){
        return true; // Parking lot is completely vacant
    }
    return false; // Parking lot has active records
}

// Central array database storing all parked vehicle objects
let parkingLot = [];

/**
 * =========================================================================
 * 3. MAIN APPLICATION RUNTIME LOOP (OUTER RING)
 * =========================================================================
 * Runs infinitely to keep the terminal alive until the 'isExit' flag is thrown.
 */
while (true){
    let isExit = false; // Safety latch to break the infinite loop from within the switch block

    console.log('\n--- Smart Parking System ---');
    console.log('(PARK / LEAVE / FORFEIT / STATUS / EXIT)\n');

    // Prompt user for an entry action
    const actionInput = readline.question('Choose action: ');
    let action = actionInput.toUpperCase().trim();
    
    /**
     * MAIN ENGINE DISPATCHER (SWITCH-CASE)
     */
    switch (action){
        
        // -----------------------------------------------------------------
        // CASE EXIT: TERMINATES APLICACTION STATE RUNTIME
        // -----------------------------------------------------------------
        case 'EXIT':
            console.log('--- Terminal Closed ---');
            isExit = true; // Flips the state flag to break the outer loop frame
            break;

        // -----------------------------------------------------------------
        // CASE PARK: VEHICLE INTAKE (MUTATED METHOD: PUSH & UNSHIFT)
        // -----------------------------------------------------------------
        case 'PARK':
            let plateNum = '';
            let type = '';

            // Input Loop 1: License Plate Capture (Guards against empty strings)
            while(true){
                const inputPlateNum = readline.question('Enter license plate: ');
                if (inputPlateNum === ''){
                    continue; // Re-prompt if the user inputs blank spaces
                }
                plateNum = inputPlateNum.toUpperCase().trim();
                break; // Fields validated, exit plate loop
            }
            
            // Input Loop 2: Priority Designation (Enforces Regular vs VIP entries)
            while (true){
                const typeInput = readline.question('Enter type (Regular / VIP): ');
                type = typeInput.toUpperCase().trim();

                // User Convenience Feature: Automatically map prefixes like "REG" to "REGULAR"
                if (typeInput.toLocaleUpperCase().trim().startsWith('REG')){
                    type = 'REGULAR';
                }

                // Guard Gate: If input fails to match valid options, block and loop back
                if (type !== 'REGULAR' && type !== 'VIP'){
                    console.log('Invalid type! Please enter Regular or VIP.');
                    continue;
                }
                break; // Fields validated, exit type loop
            }

            // Constructing a new object record based on the Car blueprint
            const car = new Car(plateNum, type);

            // Allocation routing handling based on vehicle classification rules
            if (car.type === 'REGULAR'){
                parkingLot.push(car); // .push() -> Mutated: Appends element at the absolute REAR boundary
                console.log(`-> Car ${car.plateNum} added to the back.`);
            } else {
                parkingLot.unshift(car); // .unshift() -> Mutated: Injects element at index 0 (FRONT VIP boundary)
                console.log(`-> Car ${car.plateNum} added to the front (VIP Zone).`);
            }
            break;

        // -----------------------------------------------------------------
        // CASE LEAVE: CHRONOLOGICAL DISPATCH (MUTATED METHOD: SHIFT)
        // -----------------------------------------------------------------
        case 'LEAVE':
            // Guard clause: Prevent empty array modifications
            if (checkEmpty(parkingLot)){
                console.log('Sorry! Parking lot is empty.');
                continue; // Short-circuit back to dispatcher ring
            }
            
            // Access target plate properties at index 0 (front of line) before shifting memory
            console.log(`Car ${parkingLot[0].plateNum} has left.`);
            
            parkingLot.shift(); // .shift() -> Mutated: Pulls out index 0 and remaps remaining matrix slots
            break;
            
        // -----------------------------------------------------------------
        // CASE FORFEIT: RANDOM DELETION SURGERY (MUTATED METHOD: SPLICE)
        // -----------------------------------------------------------------
        case 'FORFEIT':
            if (checkEmpty(parkingLot)){
                console.log('Sorry! Parking lot is empty');
                continue;
            }

            const targetCarInput = readline.question('Enter license plate for forfeit: ');
            const targetCar = targetCarInput.toUpperCase().trim();

            let targetIndex = -1; // Pointer index allocation, default -1 means "Not Found"

            /**
             * LINEAR SEARCH SCAN:
             * Iterates single-dimension layout to cross-reference strings with the .plateNum property.
             */
            for (let i = 0; i < parkingLot.length; i++){
                if (parkingLot[i].plateNum === targetCar){
                    targetIndex = i; // Map matched element coordinates to tracking pointer
                    break; // Cease loop processing since object coordinate has been found
                }
            }
            
            // Splice execution block triggered by lookup query results
            if (targetIndex !== -1){
                parkingLot.splice(targetIndex, 1); // .splice(pos, count) -> Mutated: Chops out 1 slot cluster at coordinates
                console.log(`-> Car with license plate ${targetCar} has left early.`);
            } else {
                console.log(`-> Car with license plate ${targetCar} is not found in the parking lot.`);
            }
            break;

        // -----------------------------------------------------------------
        // CASE STATUS: VISUAL LIST MAPPER (UNMUTATED VIEW ENGINE)
        // -----------------------------------------------------------------
        case 'STATUS':
            if (checkEmpty(parkingLot)){
                console.log('Sorry! Parking lot is empty.');
                continue;
            }
            
            // .slice() -> Unmutated Copy: Clones array safely to preserve structural database layer from rendering manipulation
            const parkingClone = parkingLot.slice();

            console.log('\n--- Current Parking Status ---');
            let index = 1; // Tracker loop increment to map clean, synchronous sequential display formatting (1, 2, 3...)
            
            // Loop through cloned vehicle profiles to map layout configurations out to the console
            for (const car of parkingClone){
                console.log(`${index}. Car ${car.plateNum} (${car.type})`);
                index++; // Step display sequence identifier forward
            }
            break;

        // -----------------------------------------------------------------
        // DEFAULT CASE: MALFORMED STRING DISPATCH TRACKER
        // -----------------------------------------------------------------
        default:
            console.log('Your input is incorrect! Please try again');
            break; // Exits switch block, safely allowing the outer while ring to roll back seamlessly
    }

    /**
     * TERMINATION CHECK SENSOR
     * Checked on every main loop round right before formatting header prints.
     */
    if (isExit){
        break; // Breaks the baseline outer infinite loop pipe chain cleanly
    }
}