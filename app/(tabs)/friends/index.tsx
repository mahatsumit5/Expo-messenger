import { View, Text } from "react-native";
import React from "react";
import { useGetAllChatRoomQuery } from "@/redux";
import CustomFlatlist from "@/components//Friends/CustomFlatlist";
import { P } from "@/components/ui/typography";
import ViewButton from "@/components/Friends/ViewButton";

const Friends = () => {
  const {
    data: rooms,
    isError,
    isLoading,
    refetch,
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
      <P>Loading.....</P>
    </View>
  ) : (
    <View className="px-2 h-full items-center  bg-background pt-5">
      <ViewButton />
      <CustomFlatlist
        type="Friends"
        activeTab={"Friends"}
        data={rooms?.data!}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

export default Friends;
