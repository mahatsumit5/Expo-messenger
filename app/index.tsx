import { View, Image } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import Icons from "@/constants/Icons";
import { landingImage } from "@/constants/images";

import CustomButton from "@/components/CustomButton";
import { useAppSelector } from "@/hooks/hooks";
import { useGetLoggedInUserQuery } from "@/redux";
import { H1 } from "@/components/ui/typography";

const Index = () => {
  useGetLoggedInUserQuery();
  const { isLoggedIn, user } = useAppSelector((store) => store.user);
  if (isLoggedIn && user) return <Redirect href={"/(tabs)/home"} />;
  return (
    <View className="items-center justify-center  p-2 h-full bg-background">
      <Image source={Icons.icon} className="h-24 w-24" resizeMode="contain" />
      <H1 className="mt-14">Where Every Chat Sparks a Connection</H1>

      <Image
        source={landingImage}
        className="h-72 w-full"
        resizeMode="contain"
      />

      <CustomButton
        isLoading={false}
        title="Get Started"
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      />
    </View>
  );
};

export default Index;
