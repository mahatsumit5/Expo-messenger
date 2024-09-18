import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import Icons from "@/constants/Icons";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { io } from "socket.io-client";
import { setSocket, setTyping } from "@/redux/reducers/socket.slice";
import { messageApi } from "@/redux/api/messageApi";
import { schedulePushNotification } from "@/hooks/useNotification.hook";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/lib/useColorScheme";
import { Sun, Moon, Search, MessageCircleIcon } from "@/lib/icons/index";
import { PortalHost } from "@rn-primitives/portal";
import CustomStatusBar from "@/components/CustomStatusBAr";
import LucidIcon from "@/components/icon/LucidIcon";
import { Button } from "@/components/ui/button";
import { Large } from "@/components/ui/typography";
import { LucideIcon } from "lucide-react-native";
import {
  House,
  Users,
  Settings,
  User2,
  PlusCircleIcon,
} from "@/lib/icons/index";
type props = {
  color: string;
  focused: boolean;
  name: string;
  icon: LucideIcon;
};

const TabsLayout = () => {
  const { isDarkColorScheme } = useColorScheme();

  const { user } = useAppSelector((store) => store.user);
  const { numberOfMessageToDisplay, skipNumberOfMessages } = useAppSelector(
    (store) => store.query
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user?.id || !user.email) return;
    const socket = io(process.env.EXPO_PUBLIC_API_URL, {
      autoConnect: true,

      query: {
        email: user.email,
      },
      transports: ["websocket"],
    });

    socket.on("connect_error", (err) => {
      dispatch(setSocket(null));
      console.log(err);
    });
    socket.on("connect", () => {
      console.log("You are connected with id", socket.id);
      dispatch(setSocket(socket));
      socket.emit("join_your_room", user.id);
    });

    socket.on("typing", (email) => {
      console.log("typing");
      dispatch(setTyping({ person: email, typing: true }));
    });
    socket.on("stopped_typing", (email) => {
      dispatch(setTyping({ person: "", typing: false }));
    });
    socket.on("getOnlineUsers", (onlineUsers: string[]) => {
      console.log("Online users", onlineUsers);
      // dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("getLikedNotification", (data) => {
      console.log(data);
      schedulePushNotification(
        "Notification",
        `${data.user.fName} ${data.user.lName} liked your post.`
      );
    });
    socket.on("getNewCommentNotification", (data) => {
      console.log(data);
      schedulePushNotification(
        "Notification",
        `${data.author.fName} ${data.author.lName} commented your post.`
      );
    });
    socket.on("getFriendRequest", (data: IFriendReq) => {
      schedulePushNotification("Notification", "You have a new friend request");
    });

    socket.on("send_message_client", (message: IMessage) => {
      schedulePushNotification("New message incoming.", message.content);
      dispatch(
        messageApi.util.updateQueryData(
          "getMessages",
          {
            roomId: message.chatRoomId,
            take: numberOfMessageToDisplay,
            skip: skipNumberOfMessages,
          },
          (draft) => {
            draft.result._count.messages = ++draft.result._count.messages;
            draft.result.messages = [message, ...draft.result.messages];
          }
        )
      );
    });

    socket.on("disconnect", () => {
      dispatch(setSocket(null));
    });
    return () => {
      socket.close();
    };
  }, [user, dispatch, numberOfMessageToDisplay, skipNumberOfMessages]);
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            display: route.name === "message" ? "none" : "flex",
            backgroundColor: isDarkColorScheme ? "#313135" : "#E6E6E6",
          },
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={House}
                name="Home"
              />
            ),
            header: () => <TabsHeader />,
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            headerShown: true,
            header: () => <TabsHeader />,

            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={Users}
                name="Friends"
              />
            ),
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
                icon={PlusCircleIcon}
                name="Create"
              />
            ),
            header: () => <TabsHeader />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={User2}
                name="Profile"
              />
            ),
            header: () => <TabsHeader />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: true,
            header: () => <TabsHeader />,

            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={Settings}
                name="Settings"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
      {/* Default Portal Host (one per app) */}
      <PortalHost />

      <CustomStatusBar />
    </>
  );
};

export default TabsLayout;

const TabIcon: React.FC<props> = ({ icon, color, name, focused }) => {
  const Icon = icon;
  return (
    <View className="items-center justify-center gap-1 ">
      <Icon size={25} className={focused ? "text-primary" : "text-secondary"} />
      <Text
        className={`${
          focused
            ? " font-pbold text-primary scale-110 transition-all "
            : "font-pregular text-secondary"
        } text-xs `}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsHeader: React.FC = () => {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  const SunIcon = Sun;
  return (
    <>
      <View className="flex flex-row justify-between  items-center gap-2 bg-header h-fit px-2 pt-16  py-2  border-b border-border">
        {/* <Image source={Icons.icon} className="h-12 w-12" resizeMode="contain" /> */}
        <Large className="font-brushell text-foreground text-3xl p-2">
          ChatApp
        </Large>

        <View className="flex flex-row items-center">
          <LucidIcon
            icon={Search}
            onPress={() => router.navigate("/search/test")}
            className="text-secondary"
          />
          <Button variant={"ghost"} onPress={toggleColorScheme}>
            {!isDarkColorScheme ? (
              <SunIcon size={25} className="text-yellow-500" />
            ) : (
              <Moon size={25} className="text-primary" />
            )}
          </Button>
          <LucidIcon
            icon={MessageCircleIcon}
            onPress={() => {
              router.replace("/(tabs)/message");
            }}
            className="text-secondary"
          />
        </View>
      </View>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} animated />
    </>
  );
};
