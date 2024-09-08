import { View, Text, FlatList, Image } from "react-native";
import React, { FC, useState } from "react";
import * as Animatable from "react-native-animatable";

type props = { images: string[] };
const HorizontalImageScroll: FC<props> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<string>("");

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Animatable.View
          className="items-center mr-5 h-96 w-[360px]"
          animation={
            item === activeImage
              ? {
                  easing: "linear",
                  from: { transform: [{ scale: 0.8 }] },
                  to: { transform: [{ scale: 0.9 }] },
                }
              : {
                  easing: "linear",
                  from: { transform: [{ scale: 0.9 }] },
                  to: { transform: [{ scale: 0.8 }] },
                }
          }
          duration={200}
        >
          <Image
            source={{ uri: item }}
            className="w-full h-full rounded-lg shadow-lg"
            resizeMode="cover"
          />
        </Animatable.View>
      )}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActiveImage(viewableItems[0].item);
        }
      }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      horizontal
    />
  );
};

export default HorizontalImageScroll;
