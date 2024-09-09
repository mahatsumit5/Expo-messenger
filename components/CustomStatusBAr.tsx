import React from "react";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/lib/useColorScheme";

const CustomStatusBar = () => {
  const { isDarkColorScheme } = useColorScheme();
  console.log(isDarkColorScheme);
  return (
    <StatusBar
      style={isDarkColorScheme ? "light" : "dark"}
      backgroundColor={isDarkColorScheme ? "#232528" : "#EAF6FF"}
    />
  );
};

export default CustomStatusBar;
