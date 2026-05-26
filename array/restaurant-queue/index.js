const readline = require('readline-sync');

/**
 * =========================================================================
 * 1. CONSTRUCTOR FUNCTION (OBJECT TEMPLATE)
 * =========================================================================
 * Instantiates uniform customer profiles to keep data structures consistent.
 * Generates an object blueprint: { name: 'STRING', type: 'REGULAR'/'VIP' }
 */
function Person (name, type) {
    this.name = name;
    this.type = type;
}

/**
 * =========================================================================
 * 2. HELPER FUNCTION (VALIDATION GATE)
 * =========================================================================
 * Evaluates whether the central queue array has elements.
 * Returns a Boolean (true/false) to cleanly handle short-circuit flow 
 * via 'continue' inside the switcher engine.
 */
function isQueueBlank(array) {
    if (array.length === 0) {
        console.log('-> System Alert: Queue is empty. Please choose another action.');
        return true; // Gates the feature, forcing a menu reset
    }
    return false; // Queue contains data, safe to process downstream
}

// Central database matrix storing active queue data (mixed layout format)
let queue = [];

/**
 * =========================================================================
 * 3. MAIN APPLICATION ORBITAL LOOP (OUTER RING)
 * =========================================================================
 * Loops indefinitely until the 'isExit' flag state flips to true.
 */
while (true) {
    // Isolated local runtime placeholders, reset on every cycle rotation
    let customer = '';
    let type = '';
    let action = '';
    let isExit = false; 

    console.log('\n--- Smart Restaurant Queue ---');
    console.log('(ARRIVE / CALL / CANCEL / REMOVE / MERGE / STATUS / EXIT)\n');

    // Prompt user input. Malformed string inputs trap naturally down into 'default' case.
    const actionInput = readline.question('Choose action: ');
    action = actionInput.toUpperCase().trim();
    
    /**
     * =========================================================================
     * 4. MAIN ACTION DISPATCHER (SWITCH-CASE)
     * =========================================================================
     */
    switch (action) {
        
        // -----------------------------------------------------------------
        // CASE EXIT: TERMINATES APPLICATION STATE RUNTIME
        // -----------------------------------------------------------------
        case 'EXIT':
            console.log('--- Terminal Closed ---');
            isExit = true; // Flips the safety latch to break the outer ring loop chain
            break;

        // -----------------------------------------------------------------
        // CASE ARRIVE: INTAKE PROCESSING (MUTATED METHOD: PUSH/UNSHIFT)
        // -----------------------------------------------------------------
        case 'ARRIVE':
            // Defensive internal loop for processing clean profile values
            while (true) {
                const customerName = readline.question('Enter customer name: ');
                customer = customerName.toUpperCase().trim();

                if (customerName === '') {
                    console.log('Please input your name.');
                    continue; // Re-prompt name capture loop
                }

                const typeName = readline.question('Enter type (Regular / VIP): ');
                type = typeName.toUpperCase().trim();

                if (type !== 'REGULAR' && type !== 'VIP') {
                    console.log('Your input is incorrect! Please fill the correct input.');
                    continue; // Re-prompt priority profile capture loop
                }
                break; // Fields validated, break out to storage routing
            }
            
            // Instantiating memory footprint via Person blueprint constructor
            const person = new Person(customer, type);
    
            // Structural branching logic based on client priority rules
            if (person.type === 'REGULAR') {
                queue.push(person); // .push() -> Mutated: Appends element at the absolute REAR boundary
                console.log(`-> ${person.name} added to the back of the queue.`);
            } else if (person.type === 'VIP') {
                queue.unshift(person); // .unshift() -> Mutated: Injects element at index 0 (FRONT boundary)
                console.log(`-> ${person.name} added to the front of the VIP queue!`);
            }
            break;

        // -----------------------------------------------------------------
        // CASE CALL: DISPATCH FRONT LINE SLOT (MUTATED METHOD: SHIFT)
        // -----------------------------------------------------------------
        case 'CALL':
            if (isQueueBlank(queue)) {
                continue; // Short-circuit back to dispatcher ring
            }
            
            /**
             * COMPOSITE DATA LAYER CHECK:
             * Guards memory extraction. If index 0 possesses a length value, it's a structural 
             * cluster Array, meaning we must use coordinate notation [0][0] to look deeper.
             */
            if (queue[0].length !== undefined) {
                // Triggers true if index 0 points to a nested group array matrix
                console.log(`-> GROUP led by ${queue[0][0].name} is invited to enter the restaurant!`);
            } else {
                // Triggers true if index 0 points to a standalone data blueprint object
                console.log(`-> ${queue[0].name} is invited to enter the restaurant!`);
            }
            queue.shift(); // .shift() -> Mutated: Removes index 0 and re-maps remaining index references
            break;

        // -----------------------------------------------------------------
        // CASE CANCEL: POP REAR END BOUNDARY (MUTATED METHOD: POP)
        // -----------------------------------------------------------------
        case 'CANCEL':
            if (isQueueBlank(queue)) {
                continue;
            }
            
            // Dynamically lock down current final array edge coordinate
            let lastIndex = queue.length - 1;
            
            // Structural detection wrapper before clearing memory
            if (queue[lastIndex].length !== undefined) {
                console.log(`-> A GROUP of ${queue[lastIndex][0].name} canceled the queue and went home.`);
            } else {
                console.log(`-> ${queue[lastIndex].name} canceled the queue and went home.`);
            }
            queue.pop(); // .pop() -> Mutated: Splices away trailing edge boundary element completely
            break;

        // -----------------------------------------------------------------
        // CASE REMOVE: TARGETED DELETION SURGERY (MUTATED METHOD: SPLICE)
        // -----------------------------------------------------------------
        case 'REMOVE':
            if (isQueueBlank(queue)) {
                continue;
            }
        
            const nameToRemoveInput = readline.question('Enter customer name to remove: ');
            const nameToRemove = nameToRemoveInput.toUpperCase().trim();
            let targetNameIndex = -1;
            let counter = 0; // Manual tracker mapping structural coordinates of array slots

            // Sequential linear data structure scan via for...of loop
            for (const element of queue) {
                
                // CONDITION A: Element is a Standalone Object
                if (element.length === undefined) { 
                    if (element.name === nameToRemove) {
                        targetNameIndex = counter; // Lock baseline array slot index
                        break;
                    }
                } 
                // CONDITION B: Element is a Cluster Group Array
                else { 
                    let isNameInGroup = false;

                    // Deep internal layer array lookup scan
                    for (const person of element) {
                        if (person.name === nameToRemove) {
                            isNameInGroup = true;
                            break; // Stop inner lookup loop
                        }
                    }

                    if (isNameInGroup) {
                        targetNameIndex = counter; // Group cluster found, lock root structural index
                        break; // Stop main line lookup loop
                    }
                }             
                counter++; // Increment tracking cursor position
            }
            
            // Mutation handling block based on look-up pointer results
            if (targetNameIndex !== -1) {
                queue.splice(targetNameIndex, 1); // .splice() -> Mutated: Chops out 1 slot package completely
                console.log(`-> The entry associated with ${nameToRemove} has been successfully removed from the queue.`);
            } else {
                console.log(`-> Customer named ${nameToRemove} not found in the queue.`);
            }
            break;

        // -----------------------------------------------------------------
        // CASE MERGE: COALESCE DATA SECTOR (ADVANCED COMPOSITE COUPLING LOGIC)
        // -----------------------------------------------------------------
        case 'MERGE':
            if (isQueueBlank(queue)) {
                continue;
            }

            let isMergeDone = false; // Outer switch-case loop flag controller

            while (true) {
                const nameToMergeInput = readline.question('Enter group names (separated by comma): ');
                if (nameToMergeInput.trim() === '') {
                    console.log('Name cannot empty! Please try again.');
                    continue;
                }

                // Generates string-based raw Array elements out of comma separations
                const mergedNames = nameToMergeInput.split(',');

                // Clean formatting allocations using index array reference updates directly
                for (let i = 0; i < mergedNames.length; i++) {
                    mergedNames[i] = mergedNames[i].toUpperCase().trim();
                }

                let indexInQueue = -1;
                let existPerson = null;
             
                /**
                 * STAGE 1: INLINE LEADER ANCHOR LOOKUP
                 * Iterates central layout to detect if an incoming member is already waiting.
                 */
                for (let i = 0; i < queue.length; i++) {
                    if (queue[i].length === undefined) { // Check plain objects profiles only
                        for (const inputName of mergedNames) {
                            if (queue[i].name === inputName) {
                                indexInQueue = i; // Map tracking pointer anchor
                                existPerson = queue[i]; // Cache data node profile
                                break;
                            }
                        }
                    }
                    if (indexInQueue !== -1) break; // Terminate query loop early if anchor is locked
                }

                const groupArray = []; // Unified nested array box layout to lock clusters under one index

                /**
                 * STAGE 2: MEMORY RE-ARRANGEMENT & INTEGRATION
                 */
                if (indexInQueue !== -1) {
                    // SCENARIO A: Anchor waiting ahead is detected
                    groupArray.push(existPerson); // Set the inline leader at index 0 of the new cluster array

                    // Process incoming secondary trailing data nodes
                    for (const name of mergedNames) {
                        if (name !== '' && name !== existPerson.name) {
                            
                            // Check if a secondary member is currently lagging behind in line, delete them to avoid duplicates
                            for (let j = 0; j < queue.length; j++) {
                                if (queue[j].length === undefined && queue[j].name === name) {
                                    queue.splice(j, 1); // Mutated: Slice away the trailing duplicate node
                                    break;
                                }
                            }
                            // Form fresh Person instance records and bundle them into group array
                            groupArray.push(new Person(name, 'REGULAR'));
                        }
                    }
                    
                    // .splice(targetIndex, deleteCount, insertItem) -> Replaces single object profile with nested cluster array block
                    queue.splice(indexInQueue, 1, groupArray);
                    console.log(`-> Merged successfully! The group follows ${existPerson.name}'s position at slot number ${indexInQueue + 1}.`);
                
                } else {
                    // SCENARIO B: Brand new cluster block arriving entirely from outside bounds
                    for (const name of mergedNames) {
                        if (name !== '') {
                            groupArray.push(new Person(name, 'REGULAR'));
                        }
                    }
                    queue.push(groupArray); // Append composite block utuh into trailing boundary limits
                    console.log(`-> New group successfully added to the back of the queue.`);
                }
                
                isMergeDone = true; 
                break; // Break inner formatting loop
            } 
            if (isMergeDone) break; // Break switcher structure scope
            break;

        // -----------------------------------------------------------------
        // CASE STATUS: LOOKUP MAP ENGINE VISUALS (UNMUTATED VIEW ENGINE)
        // -----------------------------------------------------------------
        case 'STATUS':
            console.log('\n--- Current Position ---');

            if (queue.length === 0) {
                console.log('Queue is empty');
            } else {
                let index = 1; // Sequential tracking cursor for printing aligned numbers
                
                // .slice() -> Unmutated Copy: Clones array layer safely to insulate source array from render manipulation
                const viewQueue = queue.slice();

                for (const element of viewQueue) {
                    // Polymorphic property detection check
                    if (element.length !== undefined) {
                        // Element contains length property attributes -> Renders a Nested Array Group
                        let groupNames = [];

                        // Deep layer block extraction using Nested Loops
                        for (const person of element) {
                            groupNames.push(person.name);
                        }
                        // .join() -> Unmutated: flattens internal data arrays into readable comma strings
                        console.log(`${index}. GROUP: [${groupNames.join(', ')}]`);
                    } else {
                        // Element lacks length property attributes -> Renders standard Profile Object shape
                        console.log(`${index}. ${element.name} (${element.type})`);
                    }
                    index++; // Advance aligned visual output print count
                }
            }
            break;

        // -----------------------------------------------------------------
        // DEFAULT CASE: CONSOLE INPUT FALLBACK HOOK TRAWLER
        // -----------------------------------------------------------------
        default:
            console.log('Your input is Incorrect! Please try again.');
            break; // Breaks out from switch scope, letting outer while loop roll back to the top automatically
    }

    /**
     * EXIT TRIGGER SENSING ACTUATOR
     * Checked on every single loop rotation right before structural layout re-prints.
     */
    if (isExit) {
        break; // Snaps outer ring infinite while pipeline chain cleanly
    }
}