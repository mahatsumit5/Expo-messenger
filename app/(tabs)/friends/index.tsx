import { View, Text } from "react-native";
import React from "react";
import { useGetAllChatRoomQuery } from "@/redux";
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
    <View className=" p-2  ">
      <View>
        <Text className="font-pmedium text-xl">Find New Friends</Text>
      </View>
      <HorizontalLoadingScroll />
      <View>
        <Text className="font-pmedium text-xl mt-5"> Friends</Text>
      </View>
      <HorizontalLoadingScroll />
    </View>
  ) : (
    <View className="px-2 h-full items-center  bg-background pt-5">
      <CustomFlatlist
        type="Friends"
        activeTab={"Friends"}
        data={rooms?.data!}
      />
    </View>
  );
};

export default Friends;
