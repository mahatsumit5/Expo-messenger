import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { schedulePushNotification } from "@/hooks/useNotification.hook";
import * as Location from "expo-location";
import { ErrorAlert } from "@/util";
import { useColorScheme } from "nativewind";
const Settings = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  // schedulePushNotification("You have a new notification", "hello");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Request denied.Location ");
        }
        const ocation = await Location.getCurrentPositionAsync({});
        console.log(ocation);
        setLocation(ocation);
      })();
    } catch (error) {
      ErrorAlert(error);
    }
  }, []);
  return (
    <View className="bg-background h-full ">
      <Text className="bg-background text-foreground border border-border">
        {location?.coords.latitude}
      </Text>
    </View>
  );
};

export default Settings;
