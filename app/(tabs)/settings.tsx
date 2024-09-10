import { View } from "react-native";
import React, { useEffect } from "react";
import { schedulePushNotification } from "@/hooks/useNotification.hook";
import * as Location from "expo-location";
import { ErrorAlert } from "@/lib/utils";
const Settings = () => {
  schedulePushNotification("You have a new notification", "hello");

  useEffect(() => {
    try {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Request denied.Location ");
        }
        await Location.getCurrentPositionAsync({});
      })();
    } catch (error) {
      ErrorAlert(error);
    }
  }, []);
  return <View className="bg-background h-full "></View>;
};

export default Settings;
