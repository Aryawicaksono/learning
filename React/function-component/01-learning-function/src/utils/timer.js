/**
 * 
 * @param {number} duration 
 * @returns {string}
 */
export function formatDuration(duration) {
  const SECONDS_IN_MINUTES = 60;
const MILLISECOND_IN_SECONDS = 1000;

  const seconds = duration / MILLISECOND_IN_SECONDS;
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTES);
  const remainingSeconds = Math.ceil(seconds % SECONDS_IN_MINUTES);

  let str ='';
  str += String(minutes).padStart(2, 0);
  str += ':';
  str += String(remainingSeconds).padStart(2, 0);

  return str;
}