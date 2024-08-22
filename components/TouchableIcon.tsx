import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";

const TouchableIcon: FC<{
  onPress: () => void;
  icon: number;
  className?: string;
}> = ({ onPress, icon, className }) => {
  return (
    <View className={`${className} mr-4`}>
      <TouchableOpacity className="gap-2" activeOpacity={0.7} onPress={onPress}>
        <Image source={icon} className="h-7 w-7" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default TouchableIcon;
