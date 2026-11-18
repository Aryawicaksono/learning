import { formatDuration } from "./utils/timer";
import { useTimer } from "./hooks/useTimer";
import { useEffect } from "react";

/**
 * @typedef {Object} TimerProps
 * @prop {string} label
 * @prop {number} duration
 */

/**
 * 
 * @param {TimerProps} props
 */

export function Timer({label, duration}){
  const {remainingDurations, reset} = useTimer(duration);

  useEffect(() => {
    reset();
  }, [reset, label])
  
  return <div>
    <p>{label}</p>
    <h3>{formatDuration(remainingDurations)}</h3>
  </div>;
}