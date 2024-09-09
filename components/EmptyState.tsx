import { View, Text } from "react-native";
import React, { FC } from "react";

const EmptyState: FC<{ title: string; subtitle: string }> = ({
  subtitle,
  title,
}) => {
  return (
    <View className="mt-5">
      <Text className="text-lg font-pmedium text-foreground">{title} </Text>
      <Text className="text-sm  text-gray-700  text-foreground">
        {subtitle}{" "}
      </Text>
    </View>
  );
};

export default EmptyState;
