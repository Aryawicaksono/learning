'use strict';

function calculatePromoCheckout(checkInDate, hotelTimeZone){
  const targetDate = new Date(checkInDate.getTime());

  targetDate.setDate(targetDate.getDate() + 4);

  const formatter = new Intl.DateTimeFormat('en-US',{
    timeZone: hotelTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const [{value: month}, , {value: day}, , {value: year}] = formatter.formatToParts(targetDate);

  const localeToISOString = `${year}-${month}-${day}T12:00:00`;

  const tzFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: hotelTimeZone,
    timeZoneName: 'longOffset',
  });
  const tzParts = tzFormatter.formatToParts(targetDate);
  const offsetString = tzParts.find(p => p.type === 'timeZoneName').value;

  let formattedOffset = 'Z';

  if (offsetString !== 'GMT'){
    formattedOffset = offsetString.replace('GMT', '');
    const sign = formattedOffset[0];
    const num = formattedOffset.slice(1);
    formattedOffset = `${sign}${num.padStart(2, '0')}:00`;
  }

  return new Date(localeToISOString + formattedOffset);
}

const globalCheckIn = new Date('2026-07-11T11:00:00Z');

const NYCheckOut = calculatePromoCheckout(globalCheckIn, 'America/New_York');

console.log('NYCheckoutUTC: ', NYCheckOut.toISOString());

console.log('Real Check-in changed?', globalCheckIn.toISOString() !== '2026-07-11T11:00:00.000Z' ? 'Yes(wrong)' : 'No(Right)');