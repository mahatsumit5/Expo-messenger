import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import Icons from "@/constants/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "@/components/CustomStatusBAr";
import { useRoute } from "@react-navigation/native";
import { removeToken } from "@/util";
import TouchableIcon from "@/components/TouchableIcon";
type props = {
  color: string;
  focused: boolean;
  name: string;
  icon: number;
};
const TabIcon: React.FC<props> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1 ">
      <Image source={icon} resizeMode="contain" className="w-8 h-7" />
      <Text
        className={`${focused ? " font-pbold" : "font-pregular"} text-xs `}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsHeader: React.FC = () => {
  const route = useRoute();
  const logout = async () => {
    await removeToken();
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className=" w-full  px-2 h-28  shadow-lg  ">
      <View className="flex flex-row justify-between  items-center gap-2">
        <Image source={Icons.icon} className="h-10 w-10" resizeMode="contain" />

        {route.name === "profile" ? (
          <TouchableIcon icon={Icons.logout} onPress={logout} />
        ) : (
          <View className="flex flex-row gap-5">
            <TouchableIcon
              icon={Icons.search}
              onPress={() => router.navigate("/search/test")}
              className="mr-3"
            />

            <TouchableIcon
              icon={Icons.profile}
              onPress={() => {
                router.replace("/(tabs)/profile");
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }}
      >
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
            header: (item) => <TabsHeader />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: true,

            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={Icons.add}
                name="Create"
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
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: true,
            header: () => <TabsHeader />,

            href: null,
          }}
        />
      </Tabs>

      <CustomStatusBar backgroundColor="white" style="dark" hidden={false} />
    </>
  );
};

export default TabsLayout;
