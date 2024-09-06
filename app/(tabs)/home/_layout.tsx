import React from "react";
import { Stack } from "expo-router";
import CustomStatusBar from "@/components/CustomStatusBAr";

const HomeLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[comment]"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
      <CustomStatusBar hidden={false} style="dark" />
    </>
  );
};

export default HomeLayout;
