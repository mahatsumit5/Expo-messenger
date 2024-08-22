import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icons from "@/constants/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
type props = {
  color: string;
  focused: boolean;
  name: string;
  icon: number;
};
const TabIcon: React.FC<props> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 ">
      <Image source={icon} resizeMode="contain" className="w-8 h-7" />
      <Text
        className={`${focused ? " font-pbold" : "font-pregular"} text-sm`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsHeader: React.FC = () => {
  return (
    <SafeAreaView className="border-b border-purple-600 justify-between w-full flex flex-row ">
      <Text>home</Text>
      <Pressable>
        <Text>icons</Text>
      </Pressable>
    </SafeAreaView>
  );
};
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={Icons.home}
              name="Home"
            />
          ),
          header: () => <TabsHeader />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={Icons.message}
              name="Messages"
            />
          ),
          header: () => <TabsHeader />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={Icons.profile}
              name="Profile"
            />
          ),
          header: () => <TabsHeader />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          headerShown: true,
          header: () => <TabsHeader />,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={Icons.notification}
              name="Notification"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: true,
          header: () => <TabsHeader />,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={Icons.setting}
              name="Settings"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
