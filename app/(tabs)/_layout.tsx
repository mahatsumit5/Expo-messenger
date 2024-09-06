import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import Icons from "@/constants/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "@/components/CustomStatusBAr";
import { useRoute } from "@react-navigation/native";
import { removeToken } from "@/util";
import TouchableIcon from "@/components/TouchableIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { io } from "socket.io-client";
import { setSocket, setTyping } from "@/redux/reducers/socket.slice";
import { messageApi } from "@/redux/api/messageApi";
import { schedulePushNotification } from "@/hooks/useNotification.hook";
type props = {
  color: string;
  focused: boolean;
  name: string;
  icon: number;
};

const TabsLayout = () => {
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
    dispatch(setSocket(socket));
    socket.on("connec_error", (err) => {
      console.log(err);
    });
    socket.on("connect", () => {
      console.log("You are connected with id", socket.id);
    });

    socket.emit("join_your_room", user.id);

    socket.on("typing", (email) => {
      console.log(email, "is typing");
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
      console.log(
        "user with id",
        data.userId,
        "liked your post with id",
        data.postId
      );
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

    socket.on("disconnect", () => {});
    return () => {
      socket.close();
    };
  }, [user]);
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            display: route.name === "message" ? "none" : "flex",
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
                icon={Icons.home}
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
                icon={Icons.friends}
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
                icon={Icons.add}
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
                icon={Icons.profile}
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
          name="message"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
      <CustomStatusBar style="dark" hidden={false} />
    </>
  );
};

export default TabsLayout;

const TabIcon: React.FC<props> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1 ">
      <Image source={icon} resizeMode="contain" className="w-6 h-6" />
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
              iconClassName="w-7 h-7 mr-5"
            />

            <TouchableIcon
              icon={Icons.message}
              onPress={() => {
                router.replace("/(tabs)/message");
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
