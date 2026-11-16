import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 *
 * @param  {...import("clsx").ClassValue} inputs
 * @returns
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
