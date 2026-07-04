'use strict';

const DAYS_IN_WEEK = 7;

function Calendar(config = { columnWidth: 3, gutter: 2}){
  this.config = config;
}

Calendar.prototype.render = function(yearMonth){
  return this._renderMonthTitle(yearMonth) + '\n' + this._renderMonthBody(yearMonth);
};
Calendar.prototype._renderMonthTitle = function(yearMonth){
  const title = `${yearMonth.getMonthName()} ${yearMonth.year}`;
  const lineWidth = DAYS_IN_WEEK * (this.config.columnWidth + this.config.gutter) - this.config.gutter;
  const paddingLeft = Math.round((lineWidth - title.length) / 2);

  let str = ' '.repeat(paddingLeft) + title;
  str += '\n' + '-'.repeat(lineWidth);
  str += '\n' + ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  .map(d => d.padStart(this.config.columnWidth))
  .join(' '.repeat(this.config.gutter)
  );
  return str;
};
Calendar.prototype._renderMonthBody = function(yearMonth){
 const firstDay = yearMonth.getFirstDayOfMonth();
 const daysInMonth = yearMonth.getDaysInMonth();

 const spacing = ' '.repeat(this.config.gutter);

 let str = ' '.repeat(firstDay * (this.config.columnWidth + this.config.gutter));

 for (let i = 1; i <= daysInMonth; i++){
  str += String(i).padStart(this.config.columnWidth);

  if ((firstDay + i) % 7 === 0){
    str += '\n';
  } else {
    str += spacing;
  }
 }
 return str;
};

module.exports = Calendar;