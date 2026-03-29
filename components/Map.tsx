import { Platform, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => (
  // const region = {}

  <MapView
    provider={PROVIDER_DEFAULT}
    style={{ flex: 1, borderRadius: 16 }}
    tintColor="black"
    mapType={Platform.OS === "ios" ? "mutedStandard" : "standard"}
    showsPointsOfInterest={false}
    // initialRegion={region}
    showsUserLocation={true}
    userInterfaceStyle="light"
  >
    <Text>Map</Text>
  </MapView>
);

export default Map;
