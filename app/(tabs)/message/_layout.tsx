import { View, SafeAreaView, Alert } from "react-native";
import React from "react";
import { Redirect, router, Stack } from "expo-router";
import PeopleAvatar from "@/components/PeopleAvatar";
import { useAppSelector } from "@/hooks/hooks";

import CustomStatusBar from "@/components/CustomStatusBAr";
import SearchField from "@/components/Message/SearchField";
import LucidIcon from "@/components/icon/LucidIcon";
import { ChevronLeft } from "@/lib/icons/Back";
import { extractInitial } from "@/lib/utils";
import { P } from "@/components/ui/typography";
import { Phone, MailPlus, EllipsisVertical } from "@/lib/icons/index";
const MessageLayout = () => {
  const { user, isLoggedIn } = useAppSelector((store) => store.user);
  const { room } = useAppSelector((store) => store.room);

  if (!isLoggedIn && !user?.id) return <Redirect href={"/(auth)/sign-in"} />;

  const header = ({ type }: { type: "index" | "room" }) => {
    switch (type) {
      case "index":
        return (
          <SafeAreaView className="bg-header border-b border-border">
            <View className="px-2">
              <View className="flex-row justify-between items-center ">
                <View className="flex-row items-center">
                  <LucidIcon
                    icon={ChevronLeft}
                    onPress={() => router.navigate("/(tabs)/home")}
                    size={30}
                    className="text-primary"
                  />
                  <PeopleAvatar
                    initial={extractInitial(
                      user?.fName ?? "",
                      user?.lName ?? ""
                    )}
                    profilePicture={user?.profile ?? ""}
                    size="w-14 h-14"
                  />
                  <View>
                    <P className="mx-2 font-psemibold  underline ">
                      {user?.fName} {user?.lName}
                    </P>
                    <P className=" font-plight mx-2">{user?.email}</P>
                  </View>
                </View>
                <LucidIcon icon={MailPlus} size={25} className="text-primary" />
              </View>
              <SearchField />
            </View>
          </SafeAreaView>
        );
      case "room":
        return room?.id ? (
          <SafeAreaView className="bg-header border-b border-border">
            <View className="p-2 px-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <LucidIcon
                  icon={ChevronLeft}
                  onPress={() => router.back()}
                  size={30}
                  className="
          text-primary"
                />
                <PeopleAvatar
                  initial="SM"
                  size="w-12 h-12"
                  profilePicture={room?.profile ?? ""}
                />
                <View>
                  <P className="mx-2 font-psemibold  underline ">
                    {room.fName} {room.lName}
                  </P>
                  <P className=" font-plight mx-2">{room?.email}</P>
                </View>
              </View>
              <View className="flex-row gap-2">
                <LucidIcon
                  icon={Phone}
                  onPress={() => {
                    Alert.alert("Calling", "Calling now.Please wait....");
                  }}
                  className="text-secondary"
                  size={20}
                />

                <LucidIcon
                  icon={EllipsisVertical}
                  className="text-primary"
                  size={20}
                />
              </View>
            </View>
            <CustomStatusBar />
          </SafeAreaView>
        ) : null;
    }
  };
  return (
    <>
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
        <Stack.Screen
          name="image/[uri]"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
      </Stack>
      <CustomStatusBar />
    </>
  );
};

export default MessageLayout;
