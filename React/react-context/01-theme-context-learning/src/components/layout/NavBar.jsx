import React from "react";
import { cn } from "@/utils/ui";
import { useTheme } from "@/hooks/useTheme";

export default React.memo(
  
  /**
   * @param {React.HTMLAttributes<HTMLElement>} props
   * @returns {React.ReactNode}
   */
  function NavBar({className, children, ...props}) {
    const {theme} = useTheme();
    const isDark = theme === 'dark';
    
    return (
      <nav
        className={cn("py-0.5 px-1.5 border rounded-xs " + (isDark? "border-gray-50" : "border-gray-900"), className)}
        {...props}
      >
        {children}
      </nav>
    );
});
