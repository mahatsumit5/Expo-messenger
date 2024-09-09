import React from "react";
import { Stack } from "expo-router";

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
    </>
  );
};

export default HomeLayout;
