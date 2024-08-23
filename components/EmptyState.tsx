import { View, Text } from "react-native";
import React, { FC } from "react";

const EmptyState: FC<{ title: string; subtitle: string }> = ({
  subtitle,
  title,
}) => {
  return (
    <View className="">
      <Text className="text-lg font-pmedium text-center">{title} </Text>
      <Text className="text-sm text-center text-gray-700  mt-2">
        {subtitle}{" "}
      </Text>
    </View>
  );
};

export default EmptyState;
