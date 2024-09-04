import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import PeopleAvatar from "@/components/PeopleAvatar";
import { useAppSelector } from "@/hooks/hooks";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import CustomStatusBar from "@/components/CustomStatusBAr";

const MessageLayout = () => {
  const { user } = useAppSelector((store) => store.user);
  const { room } = useAppSelector((store) => store.room);
  const header = ({ type }: { type: "index" | "room" }) => {
    switch (type) {
      case "index":
        return (
          <SafeAreaView className="bg-background">
            <View className="p-2 px-4">
              <View className="flex-row items-center">
                <TouchableIcon
                  onPress={() => router.back()}
                  icon={Icons.back2}
                  iconClassName="w-5 h-5"
                />
                <PeopleAvatar
                  initial="SM"
                  size="w-12 h-12 mx-2"
                  profilePicture={user?.profile ?? null}
                />
                <View>
                  <Text className="mx-2 font-psemibold text-lg underline ">
                    {user?.fName} {user?.lName}
                  </Text>
                  <Text className="text-sm font-plight mx-2">
                    {user?.email}
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        );
      case "room":
        return room?.id ? (
          <SafeAreaView className="bg-background">
            <View className="p-2 px-4">
              <View className="flex-row items-center">
                <TouchableIcon
                  onPress={() => router.back()}
                  icon={Icons.back2}
                  iconClassName="w-5 h-5 mx-2"
                />
                <PeopleAvatar
                  initial="SM"
                  size="w-12 h-12"
                  profilePicture={room?.profile ?? null}
                />
                <View>
                  <Text className="mx-2 font-psemibold text-lg underline ">
                    {room.fName} {room.lName}
                  </Text>
                  <Text className="text-sm font-plight mx-2">
                    {room?.email}
                  </Text>
                </View>
              </View>
            </View>
            <CustomStatusBar
              hidden={false}
              backgroundColor="white"
              style="dark"
            />
          </SafeAreaView>
        ) : null;
    }
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Message",
          header: () => header({ type: "index" }),
        }}
      />
      <Stack.Screen
        name="[room]"
        options={{
          headerShown: true,
          header: () => header({ type: "room" }),
        }}
      />
    </Stack>
  );
};

export default MessageLayout;
