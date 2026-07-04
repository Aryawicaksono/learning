'use strict';

const EPOCH_YEAR = 1800;
const EPOCH_FIRST_DAY = 3;

function YearMonth(year, month){
  this.year = year;
  this.month = month;
}

YearMonth.prototype.getDaysInMonth = function(){
  return getDaysInMonth(this.year, this.month);
};
YearMonth.prototype.getFirstDayOfMonth = function(){
  return (EPOCH_FIRST_DAY + this.getDaysSinceEpoch()) % 7;
};
YearMonth.prototype.getDaysSinceEpoch = function(){
  let days = 0;
  for (let y = EPOCH_YEAR; y < this.year; y++){
    days += isLeapYear(y) ? 366 : 365;
  }
  for (let m = 1; m < this.month; m++){
    days += getDaysInMonth(this.year, m)
  }
  return days;
};
YearMonth.prototype.getMonthName = function(){
  switch (this.month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
};

function getDaysInMonth(year, month){
  switch (month){
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2: 
    return isLeapYear(year) ? 29 :28;
  }
}

function isLeapYear(year){
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

module.exports = YearMonth;