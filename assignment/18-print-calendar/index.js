'use strict';

const readline = require('readline-sync');

const YearMonth = require('./yearMonth');
const Calendar = require('./calendar');

const yearMonth = new YearMonth(2006, 6);
const calendar = new Calendar();

console.log(calendar.render(yearMonth));