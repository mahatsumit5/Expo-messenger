import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import {
  useGetAllChatRoomQuery,
  useGetAllUsersQuery,
  useGetFriendRequestQuery,
  useGetSentFriendRequestQuery,
} from "@/redux";
import HorizontalLoadingScroll from "@/components/HorizontalLoadingScroll";
import CustomFlatlist from "@/components/CustomFlatlist";

export const tabs = ["Friends", "Request", "Sent Request", "allUsers"] as const;

const Friends = () => {
  const {
    data: rooms,
    isError,
    isLoading,
  } = useGetAllChatRoomQuery({
    page: 1,
    search: "",
    take: 10,
  });

  return isError ? (
    <View>
      <Text>Error occured</Text>
    </View>
  ) : isLoading ? (
    <ScrollView className=" p-2  ">
      <View>
        <Text className="font-pmedium text-xl">Find New Friends</Text>
      </View>
      <HorizontalLoadingScroll />
      <View>
        <Text className="font-pmedium text-xl mt-5"> Friends</Text>
      </View>
      <HorizontalLoadingScroll />
    </ScrollView>
  ) : (
    <ScrollView className="px-2">
      <CustomFlatlist
        type="Friends"
        activeTab={"Friends"}
        data={rooms?.data!}
      />
    </ScrollView>
  );
};

export default Friends;
