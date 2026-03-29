import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";
import { Platform, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  });

  if (!userLatitude || !userLongitude) {
    return <Text>Loading map...</Text>;
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ flex: 1, borderRadius: 16 }}
      tintColor="black"
      mapType={Platform.OS === "ios" ? "mutedStandard" : "standard"}
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation
      userInterfaceStyle="light"
    />
  );
};

export default Map;
