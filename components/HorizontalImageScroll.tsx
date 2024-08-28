import { View, Text, FlatList, Image } from "react-native";
import React, { FC } from "react";
type props = { images: string[] };
const HorizontalImageScroll: FC<props> = ({ images }) => {
  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View className="items-center mr-5">
          <Image source={{ uri: item }} className="h-72 rounded-md w-96" />
        </View>
      )}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      horizontal
    />
  );
};

export default HorizontalImageScroll;
