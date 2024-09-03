import { View, Text } from "react-native";
import React, { FC } from "react";

const EmptyState: FC<{ title: string; subtitle: string }> = ({
  subtitle,
  title,
}) => {
  return (
    <View className="mt-5">
      <Text className="text-lg font-pmedium ">{title} </Text>
      <Text className="text-sm  text-gray-700  ">{subtitle} </Text>
    </View>
  );
};

export default EmptyState;
