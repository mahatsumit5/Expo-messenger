import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Profile",
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          // headerShown: true,
          presentation: "modal",
          headerBackTitle: "Profile",
          headerTitle: "Edit Profile",
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
