import { ActivityIndicator } from "react-native";
import React from "react";

const LoadingState = () => {
  return (
    <ActivityIndicator
      animating={true}
      size={"small"}
      className="text-primary-foreground"
    />
  );
};

export default LoadingState;
