import { useEffect, useState } from "react";

function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("opervia-theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("opervia-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) =>
            current === "light" ? "dark" : "light"
        );
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-sm btn-outline-secondary"
            aria-label="Toggle theme"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}

export default ThemeToggle;