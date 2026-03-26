import React, { createContext, useState } from "react"
import { useColorScheme } from "react-native"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  colorScheme: "light" | "dark"
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>("system")

  const colorScheme =
    theme === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : theme

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colorScheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
