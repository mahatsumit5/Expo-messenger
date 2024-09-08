import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@/constants/Icons";
import { landingImage } from "@/constants/images";

import CustomButton from "@/components/CustomButton";
import { useAppSelector } from "@/hooks/hooks";
import { useGetLoggedInUserQuery } from "@/redux";

const index = () => {
  useGetLoggedInUserQuery();

  const { isLoggedIn, user } = useAppSelector((store) => store.user);
  if (isLoggedIn && user) return <Redirect href={"/(tabs)/settings"} />;
  return (
    <SafeAreaView className=" h-full items-center justify-center bg-slate-100">
      <ScrollView className="">
        <View className="items-center justify-center  px-4">
          <Image
            source={Icons.icon}
            className="h-24 w-24"
            resizeMode="contain"
          />
          <Text className="text-black text-4xl font-pmedium">
            Where Every Chat Sparks a Connection
          </Text>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
