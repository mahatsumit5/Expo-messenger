import { View, Text, Image, FlatList } from "react-native";
import React, { FC } from "react";
import EmptyState from "./EmptyState";
import { ImagePickerAsset } from "expo-image-picker";

const ImageSlider: FC<{ images: ImagePickerAsset[]; onPress: () => void }> = ({
  images,
  onPress,
}) => {
  return (
    <FlatList
      data={images}
      horizontal
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => (
        <View className="items-center  relative ">
          <Image source={{ uri: item.uri }} className="h-72 rounded-md w-96" />
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState title="No Images selected" subtitle="" />
      )}
    />
  );
};

export default ImageSlider;
