import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Comment = () => {
  const { comment } = useLocalSearchParams();
  return (
    <View className="p-4">
      <Text>{comment}</Text>
    </View>
  );
};

export default Comment;
