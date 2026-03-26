import { Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../hooks/useTheme"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const getThemeIcon = () => {
    if (theme === "light") return "☀️"
    if (theme === "dark") return "🌙"
    return "⚙️"
  }

  const getThemeLabel = () => {
    if (theme === "light") return "Light"
    if (theme === "dark") return "Dark"
    return "System"
  }

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="rounded-full bg-gray-200 px-6 py-3 dark:bg-gray-700"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl">{getThemeIcon()}</Text>
        <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {getThemeLabel()} Mode
        </Text>
      </View>
    </TouchableOpacity>
  )
}
