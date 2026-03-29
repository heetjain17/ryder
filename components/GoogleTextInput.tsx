import { GoogleInputProps } from "@/types/types";
import { Text, View } from "react-native";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => (
  <View
    className={`relative z-50 flex flex-row items-center justify-center rounded-xl ${containerStyle}`}
  >
    <Text>Search</Text>
  </View>
);

export default GoogleTextInput;
