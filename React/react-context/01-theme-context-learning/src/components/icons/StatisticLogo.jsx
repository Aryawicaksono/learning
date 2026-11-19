import React from "react";
import { useId } from "react";
import { cn } from "@/utils/ui";

export default React.memo(
  /** 
   * @param {string} [className]
   * @param {React.SVGAttributes<SVGSVGElement>} props
   * @returns {SVGSVGElement}
  */
  function StatisticsLogo({classname, ...props}) {
  const uid = useId();

  const bar1Id = `${uid}-bar1`;
  const bar2Id = `${uid}-bar2`;
  const bar3Id = `${uid}-bar3`;
  const bar4Id = `${uid}-bar4`;
  const baseMountainId = `${uid}-baseMountain`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className= {cn("w-15 h-15",classname)}
      {...props}
    >
      <defs>
        <linearGradient id={bar1Id} x1="8" y1="24" x2="18" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <linearGradient id={bar2Id} x1="21" y1="18" x2="31" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        <linearGradient id={bar3Id} x1="34" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={bar4Id} x1="47" y1="6" x2="57" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id={baseMountainId} x1="32" y1="33" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>

      <path d="M8 26 C8 24.9 8.9 24 10 24 H16 C17.1 24 18 24.9 18 26 V46.5 L8 56.5 Z" fill={`url(#${bar1Id})`} />
      <path d="M18 49.5 V57 C18 57.6 17.6 58 17 58 H9.5 L18 49.5 Z" fill={`url(#${baseMountainId})`} />

      <path d="M21 20 C21 18.9 21.9 18 23 18 H29 C30.1 18 31 18.9 31 20 V42 L26 36.5 L21 41.5 Z" fill={`url(#${bar2Id})`} />
      <path d="M21 44.5 L26 39.5 L31 45 V57 C31 57.6 30.6 58 30 58 H22 C21.4 58 21 57.6 21 57 Z" fill={`url(#${baseMountainId})`} />

      <path d="M34 14 C34 12.9 34.9 12 36 12 H42 C43.1 12 44 12.9 44 14 V45.5 L39 40.5 L34 45.5 Z" fill={`url(#${bar3Id})`} />
      <path d="M34 48.5 L39 43.5 L44 48.5 V57 C44 57.6 43.6 58 43 58 H35 C34.4 58 34 57.6 34 57 Z" fill={`url(#${baseMountainId})`} />

      <path d="M47 8 C47 6.9 47.9 6 49 6 H55 C56.1 6 57 6.9 57 8 V56.5 L47 46.5 Z" fill={`url(#${bar4Id})`} />
      <path d="M47 49.5 L55.5 58 H48 C47.4 58 47 57.6 47 57 Z" fill={`url(#${baseMountainId})`} />
    </svg>
  );
});