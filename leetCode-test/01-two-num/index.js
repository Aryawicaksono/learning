'use strict';

function numsIndex(nums,target){
  const map = new Map();

  for (let i = 0; i < nums.length; i++){
    const currentNumber = nums[i];
    const result = target - currentNumber;

    if (map.has(result)){
      return [map.get(result), i];
    }
    map.set(currentNumber, i);
  }
}

const nums = [3,2,4];
const target = 6;

console.log(numsIndex(nums,target));