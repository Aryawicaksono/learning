'use strict';

const localTime = '2026-07-11T11:00:00'

function getUtcCheckoutTime(time, utcOffset){
  const date = new Date(time + 'Z');
  date.setHours(date.getHours() - utcOffset);
  return date.toISOString();
}

console.log(localTime);
console.log(getUtcCheckoutTime(localTime, 7));
console.log(getUtcCheckoutTime(localTime, -4));