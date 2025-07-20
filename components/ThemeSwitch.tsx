"use client";

import { useTheme } from "next-themes";
import { MoonStar, Sun } from 'lucide-react';

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            type="button"
            className="absolute top-[16px] left-[16px] z-99 cursor-pointer bg-text dark:bg-dark-text text-accent dark:text-dark-accent rounded-md p-[4px]"
            title="Toggle theme"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun
                className="size-[24px] dark:hidden"
            />

            <MoonStar
                className="hidden size-[24px] dark:block"
            />
        </button>
    );
}
