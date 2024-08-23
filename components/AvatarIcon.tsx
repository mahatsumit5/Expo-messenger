import { Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";

const AvatarIcon: FC<{ initial: string }> = ({ initial }) => {
  return (
    <TouchableOpacity className="bg-gray-300 p-3 items-center rounded-full">
      <Text className=" font-pbold text-xs">{initial}</Text>
    </TouchableOpacity>
  );
};

export default AvatarIcon;
