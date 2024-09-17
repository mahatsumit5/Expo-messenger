import { View, Image, FlatList } from "react-native";
import React, { FC } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import { Large } from "./ui/typography";
import LucidIcon from "./icon/LucidIcon";
import { PlusCircleIcon } from "@/lib/icons/index";
import { Button } from "./ui/button";
const ImageSlider: FC<{ images: ImagePickerAsset[]; onPress?: () => void }> = ({
  images,
  onPress,
}) => {
  return (
    <FlatList
      data={images}
      horizontal
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => (
        <View className="h-44 w-60 relative items-center">
          <Image
            source={{ uri: item.uri }}
            className="h-full rounded-md w-full"
            resizeMode="cover"
          />
        </View>
      )}
      ListEmptyComponent={() => (
        <View className=" h-48  justify-center bg-input rounded-xl">
          <Button variant={"ghost"} className="gap-2 ">
            <LucidIcon
              icon={PlusCircleIcon}
              size={30}
              onPress={onPress}
              className="text-primary"
            />
            <Large>Select image</Large>
          </Button>
        </View>
      )}
    />
  );
};

export default ImageSlider;
