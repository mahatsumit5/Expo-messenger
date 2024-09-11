import { View } from "react-native";
import React, { FC } from "react";
import { Large, Muted } from "./ui/typography";

const EmptyState: FC<{ title: string; subtitle: string }> = ({
  subtitle,
  title,
}) => {
  return (
    <View className="mt-5 px-4">
      <Large>{title} </Large>
      <Muted>{subtitle}</Muted>
    </View>
  );
};

export default EmptyState;
