import { View, Text, Image, FlatList } from "react-native";
import React, { FC } from "react";
import EmptyState from "./EmptyState";
import { ImagePickerAsset } from "expo-image-picker";

const ImageSlider: FC<{ images: ImagePickerAsset[] }> = ({ images }) => {
  return (
    <FlatList
      data={images}
      horizontal
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} className="h-full w-full" />
      )}
      ListEmptyComponent={() => (
        <EmptyState title="No Images selected" subtitle="" />
      )}
    />
  );
};

export default ImageSlider;
