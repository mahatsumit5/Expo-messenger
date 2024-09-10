import React from "react";
import CustomFlatlist from "@/components/Friends/CustomFlatlist";
import { useGetFriendRequestQuery } from "@/redux";
import { View } from "react-native";
import ViewButton from "@/components/Friends/ViewButton";

const Request = () => {
  const { data: friendReq } = useGetFriendRequestQuery();
  return (
    <View className="items-center bg-background h-full pt-5">
      <ViewButton />
      <CustomFlatlist
        type="Request"
        activeTab={"Request"}
        data={friendReq?.data.result ?? []}
      />
    </View>
  );
};

export default Request;
