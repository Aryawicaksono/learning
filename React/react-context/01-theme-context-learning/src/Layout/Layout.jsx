import React from "react";
import { useTheme } from "@/hooks/useTheme";
import Main from "@/components/layout/Main";
import NavBar from "@/components/layout/NavBar";
import Card from "@/components/ui/Card";
import { Aside } from "@/components/layout/Aside";
import StatisticLogo from "@/components/icons/StatisticLogo";

/**
 * Main application layout component.
 *
 * Renders the top navigation bar with a theme toggle button, a sidebar navigation menu,
 * and the main content area displaying user profile details. Dynamically adapts its
 * styling based on the current theme context (`light` or `dark`).
 *
 * @component
 * @returns {React.JSX.Element} The rendered layout structure.
 */
function Layout() {
  const { theme, toggleTheme, person } = useTheme();
  const isDark = theme === "dark";
  const buttonsLabels = ["User", "Task", "Report", "Contact"];

  return (
    <div
      className={
        "flex flex-col flex-1 px-100 pt-20 " +
        (isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-950")
      }
    >
      <NavBar className="flex justify-between items-center">
        <StatisticLogo />
        <button
          className={
            "p-2 rounded-full border cursor-pointer " +
            (isDark ? "text-gray-950 border-black" : "text-gray-50 border-gray-50")
          }
          onClick={toggleTheme}
        >
          <span>{isDark ? "🌙" : "🌞"}</span>
        </button>
      </NavBar>
      <div className="flex ">
        <Aside className="flex pt-15 justify-center items-center">
          <NavBar className="flex flex-col border-none">
            {buttonsLabels.map((buttonLabel, index) => (
              <button
                key={index}
                className={"py-1 px-2 " + (isDark ? "text-white" : "text-black")}
              >
                {buttonLabel}
              </button>
            ))}
          </NavBar>
        </Aside>
        <Main className="flex-1">
          <Card className="flex flex-col gap-2 ">
            <h2>Name: {person.name}</h2>
            <p>Sex: {person.sex}</p>
            <p>Occupation:{person.occupation}</p>
            <p>{theme}</p>
          </Card>
        </Main>
      </div>
    </div>
  );
}

export default React.memo(Layout);