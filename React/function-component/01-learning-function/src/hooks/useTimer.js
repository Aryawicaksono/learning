import { useState, useEffect, useCallback } from "react";
/**
 * @typedef {Object} useTimerReturnValue
 * @prop {number} remainingDurations
 * @prop {() => void} reset
 */

/**
 * this hooks return an object that contains remaining
 * duration that keep updating every seconds and a reset
 * function.
 * @param {number} duration 
 * @returns {useTimerReturnValue}
 */
export function useTimer(duration){
  const [remainingDurations, setRemainingDurations] = useState(duration)
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const endMs = Date.now() + duration;
    let handle;

    const handler = () => {
      const remainingDurations = Math.max(0, endMs - Date.now());
      setRemainingDurations(remainingDurations);

      if (remainingDurations <= 0 && handle) {
        clearInterval(handle) 
      }
    };

    handler();

    handle = setInterval(handler, 1000);

    return () => {
      clearInterval(handle)
    }
  }, [duration, flag]);

  const reset = useCallback(() => {
    setFlag(flag => !flag)
  }, []);

  return {remainingDurations, reset};
}

// export function useTimer(duration, dependencies = []) {
//   const [remainingDurations, setRemainingDurations] = useState(duration);

//   useEffect(() => {
//     let endMs = Date.now() + duration;
//     let handle;

//     const handler = () => {
//       const remainingDurations = Math.max(0, endMs - Date.now());

//       setRemainingDurations(remainingDurations)

//       if (remainingDurations <= 0 && handle) {
//         clearInterval(handle);
//       }
//     }

//     handler();
//     handle = setInterval(handler, 1000);

//     return () => { clearInterval(handle)};
//   }, [duration, ...dependencies])


//   return remainingDurations;
// }