import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { schedulePushNotification } from "@/hooks/useNotification.hook";

const settings = () => {
  schedulePushNotification("You have a new notification", "hello");
  return (
    <View>
      <Text>settings</Text>
    </View>
  );
};

export default settings;
