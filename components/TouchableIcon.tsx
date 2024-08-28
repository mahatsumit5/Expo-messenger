import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";

const TouchableIcon: FC<{
  onPress: () => void;
  icon: number;
  className?: string;
  iconClassName?: string;
}> = ({ onPress, icon, className, iconClassName = "h-7 w-7" }) => {
  return (
    <View className={`${className} `}>
      <TouchableOpacity className="gap-2" activeOpacity={0.7} onPress={onPress}>
        <Image source={icon} className={iconClassName} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default TouchableIcon;
