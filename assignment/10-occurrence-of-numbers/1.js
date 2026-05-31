const readline = require('readline-sync');

/**
 * =========================================================================
 * 1. STRING PARSER FUNCTION
 * =========================================================================
 * Converts a space-separated string of numbers into an Array of real Integers.
 * * @param {string} str - Raw string input from user (e.g., "10 20 10")
 * @returns {number[]} An array containing real numeric values (e.g., [10, 20, 10])
 */
function parseIntegers(str) {
  // .split(' ') -> Splits the single string into an array of substrings using space as a divider
  const strs = str.split(' ');
  const integers = [];

  for (let i = 0; i < strs.length; i++) {
    // Unary Plus Operator (+) -> Instantly converts string digits (e.g., "5") into actual numbers (5)
    const integer = +strs[i];
    integers.push(integer);
  }

  return integers;
}

/**
 * =========================================================================
 * 2. FREQUENCY COUNTER ENGINE
 * =========================================================================
 * Maps out how many times each unique integer appears inside the list.
 * Uses an Object as a Hash Map for high performance ($O(N)$ Time Complexity).
 * * @param {number[]} values - Array of integers to look up
 * @returns {Object} A key-value map dictionary: { 'number': total_counts }
 */
function buildOccurrences(values) {
  const occurences = {}; // The storage map template dictionary

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    // 'in' Operator -> Checks if this specific number has already been recorded as a key inside our object
    if (value in occurences) {
      occurences[value]++; // If already recorded, step increment the count value by 1
    } else {
      occurences[value] = 1; // If it's a brand new number, initialize its memory slot starting at 1
    }
  }

  return occurences;
}

/**
 * =========================================================================
 * 3. MAIN RUNTIME ARCHITECTURE
 * =========================================================================
 */

// Step 1: Request data input from the user console and parse it immediately into numbers
const integers = parseIntegers(readline.question('Enter the integers between 1 and 100: '));

// Step 2: Pass the numbers into the engine to map out their occurrence counts
const occurrences = buildOccurrences(integers);

// Step 3: Iterate through the final object container using for...in loop (used specifically for reading Object Keys)
for (const integer in occurrences) {
  const occurence = occurrences[integer]; // Extract the total count value mapped to this key

  // Pluralization Check: Enforce grammatical consistency inside the user console output
  if (occurence === 1) {
    console.log(`${integer} occurs ${occurence} time`);
  } else {
    console.log(`${integer} occurs ${occurence} times`);
  }
}