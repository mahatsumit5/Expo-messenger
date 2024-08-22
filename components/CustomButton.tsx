import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import React, { FC } from "react";

type props = {
  title: string;
  isLoading: boolean;
  onPress: (event: GestureResponderEvent) => void;
};
const CustomButton: FC<props> = ({ title, isLoading, onPress }) => {
  return (
    <TouchableOpacity
      className="mt-5 w-full items-center  p-3 rounded-lg bg-blue-700 shadow-md shadow-black/75 hover:scale-110"
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      <Text className="text-white font-psemibold text-lg">{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
