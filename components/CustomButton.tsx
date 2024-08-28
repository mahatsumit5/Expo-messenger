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
  disabled?: boolean;
};
const CustomButton: FC<props> = ({ title, isLoading, onPress, disabled }) => {
  return (
    <TouchableOpacity
      className="mt-5 w-full items-center  p-3 rounded-lg bg-primary shadow-md shadow-shadow hover:scale-110 flex flex-row justify-center disabled:bg-primary/40"
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
    >
      <Text className="text-primary-foreground font-psemibold text-lg">
        {!isLoading ? title : "Please wait..."}
      </Text>

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
