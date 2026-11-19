import React from "react";
import { cn } from "@/utils/ui";
import { useTheme } from "@/hooks/useTheme";

/**
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @returns {React.ReactNode}
 */
export default React.memo(function Card({className, children, ...props}) {
  const {theme} = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        "px-2.5 py-4 rounded-1.5 border " + (isDark? "bg-gray-800 border-gray-100" : "bg-gray-50 border-gray-400"), 
        className)}
      {...props}
    >
      {children}
    </div>
  )
});