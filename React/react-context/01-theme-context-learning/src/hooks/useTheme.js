import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export function useTheme () {
  const context = useContext(ThemeContext);

  if(context === null) {
    throw new Error('useTheme must used in component <ThemeProvider>.')
  }
  return context;
}