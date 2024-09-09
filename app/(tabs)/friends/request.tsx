import { View, Text } from "react-native";
import React from "react";
import CustomFlatlist from "@/components/CustomFlatlist";
import { useGetFriendRequestQuery } from "@/redux";

const request = () => {
  const { data: friendReq } = useGetFriendRequestQuery();
  return (
    <CustomFlatlist
      type="Request"
      activeTab={"Request"}
      data={friendReq?.data.result ?? []}
    />
  );
};

export default request;
