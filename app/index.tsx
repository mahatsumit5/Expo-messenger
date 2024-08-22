import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@/constants/Icons";
import { landingImage } from "@/constants/images";
import { StatusBar } from "expo-status-bar";
import CustomStatusBar from "@/components/CustomStatusBAr";
import CustomButton from "@/components/CustomButton";

const NotFound = () => {
  return (
    <SafeAreaView className=" h-full items-center justify-center bg-slate-100">
      <ScrollView className="">
        <View className="items-center justify-center  gap-5 px-4">
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
      <CustomStatusBar style="dark" hidden={false} backgroundColor="#172554" />
    </SafeAreaView>
  );
};

export default NotFound;
