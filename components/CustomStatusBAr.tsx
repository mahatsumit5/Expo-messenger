import React from "react";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
type props = {
  style: StatusBarStyle;
  hidden: boolean;
  backgroundColor?: string;
};
const CustomStatusBar: React.FC<props> = ({
  hidden,
  style,
  backgroundColor,
}) => {
  return (
    <StatusBar
      backgroundColor={`${backgroundColor}`}
      style={`${style as StatusBarStyle}`}
      hidden={hidden}
      hideTransitionAnimation="fade"
    />
  );
};

export default CustomStatusBar;
