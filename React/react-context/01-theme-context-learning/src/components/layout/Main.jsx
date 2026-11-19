import React from "react";
import { cn } from "@/utils/ui";

export default React.memo(
  /**
   * @param {React.HTMLAttributes<HTMLElement>} props
   * @return {React.ReactElement}
   */
  function Main ({className, children, ...props}) {
    return (
      <main
      className={cn("p-4",className)}
        {...props}
      >
        {children}
      </main>
    );
  }
)