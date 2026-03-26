import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemeToggle } from "../components/ThemeToggle"

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="flex-1 items-center justify-center gap-8 px-4 py-8">
          <View className="items-center gap-4">
            <Text className="text-5xl font-bold text-gray-900 dark:text-white">
              Uber Clone
            </Text>
            <Text className="text-center text-lg text-gray-600 dark:text-gray-400">
              Welcome to your ride
            </Text>
          </View>

          <ThemeToggle />

          <View className="mt-8 rounded-2xl bg-gray-100 p-6 dark:bg-gray-800">
            <Text className="text-center text-sm text-gray-700 dark:text-gray-300">
              Try toggling the theme! 🎨
            </Text>
            <Text className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500">
              Light → Dark → System
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
