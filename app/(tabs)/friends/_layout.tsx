import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useTheme,
  type ParamListBase,
  type TabNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MaterialTopTabsLayout() {
  const { colors } = useTheme();
  return (
    <MaterialTopTabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.notification,
        },
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: "auto", minWidth: 100 },
      }}
      className="bg-background"
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Friends",
        }}
      />
      <MaterialTopTabs.Screen
        name="request"
        options={{
          title: "Request",
        }}
      />
      <MaterialTopTabs.Screen
        name="sentRequest"
        options={{
          title: "Sent Request",
        }}
      />
      <MaterialTopTabs.Screen
        name="peoples"
        options={{
          title: "People",
        }}
      />
    </MaterialTopTabs>
  );
}
