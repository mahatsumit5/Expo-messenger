import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";

const SmallIconButton: FC<{
  onPress: () => void;
  icon: number;
  iconClassName?: string;
  title: string;
  disabled?: boolean;
}> = ({
  onPress,
  icon,
  iconClassName = "h-7 w-7",
  title,
  disabled = false,
}) => {
  return (
    <View
      className={` bg-primary w-1/2 rounded-lg items-center justify-center`}
    >
      <TouchableOpacity
        className="gap-2 flex-row items-center p-2"
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
      >
        <Image source={icon} className={iconClassName} resizeMode="contain" />
        <Text className="text-white font-pmedium text-sm">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SmallIconButton;
