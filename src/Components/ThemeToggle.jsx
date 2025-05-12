import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("retro");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "retro";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "retro" ? "dracula" : "retro";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline mr-2">
      {theme === "retro" ? <img className="h-4 w-4" src="https://i.ibb.co.com/XZbbBDpS/icons8-crescent-moon-50.png" alt="moon" /> : <img className="h-4 w-4" src="https://i.ibb.co.com/yJ4B03c/icons8-sun-50-1.png" alt="sun" /> }
    </button>
  );
};

export default ThemeToggle;
