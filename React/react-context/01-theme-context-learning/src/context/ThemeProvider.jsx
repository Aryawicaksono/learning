import { useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { useCallback } from "react";

/**
 * @param {React.ReactNode} children
 * @returns {React.ReactElement}
 */
export function ThemeProvider({children}){
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback( () => {
    setTheme((theme) => theme === 'light'? 'dark' : 'light');
  }, []
  );

  const person = {
      name: "Petruk KanthongBolong",
      sex: "Male",
      occupation: "Admin",
    }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, person}}>
      {children}
    </ThemeContext.Provider>
  );
}