import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const NotFound = () => {
  return (
    <View>
      <Text>NotFound</Text>
      <Link href={"/(tabs)/home"}>home</Link>
    </View>
  );
};

export default NotFound;
