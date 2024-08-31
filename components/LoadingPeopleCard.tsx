import { View, Text } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
const LoadingPeopleCard = () => {
  return (
    <Animatable.View
      className="animate-pulse bg-slate-200 w-full h-full rounded-xl"
      animation={{
        from: {
          backgroundColor: "white",
        },
        to: { backgroundColor: "#f1edec" },
      }}
      iterationCount={"infinite"}
      direction="alternate"
    ></Animatable.View>
  );
};

export default LoadingPeopleCard;
