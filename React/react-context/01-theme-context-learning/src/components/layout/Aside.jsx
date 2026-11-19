import React from "react";
import { cn } from "@/utils/ui"
import { useTheme } from "@/hooks/useTheme";

export const Aside = React.memo(
  /**
   * @param {React.HTMLAttributes<HTMLElement>} [props]
   * @returns {React.ReactElement}
   */
  function Aside({className, children, ...props}){
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
      <aside 
        className = {cn("border rounded-xl pt-5 pb-10 px-2 " + (isDark? "border-gray-50" : "border-gray-900"), className)} 
        {...props}
      >
        {children}
      </aside>
    )
});