import { View, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/button";
import { X } from "@/lib/icons/index";
import CustomStatusBar from "@/components/CustomStatusBAr";

const Images = () => {
  const { uri } = useLocalSearchParams();
  const CloseIcon = X;
  return (
    <View className="h-full w-full bg-background relative">
      <Image
        source={{ uri: uri as string }}
        className="h-full w-full"
        resizeMethod="auto"
        resizeMode="cover"
      />
      <Button
        variant={"ghost"}
        className=" rounded-full absolute top-2 right-2"
        onPress={() => router.back()}
      >
        <CloseIcon />
      </Button>
      <CustomStatusBar hidden />
    </View>
  );
};

export default Images;
