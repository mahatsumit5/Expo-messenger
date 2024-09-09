import { View, Text } from "react-native";
import React from "react";
import CustomFlatlist from "@/components/CustomFlatlist";
import { useGetSentFriendRequestQuery } from "@/redux";

const sentRequest = () => {
  const { data: sentReq } = useGetSentFriendRequestQuery({
    page: 1,
    search: "",
  });
  return (
    <CustomFlatlist
      type="Sent Request"
      activeTab={"Sent Request"}
      data={sentReq?.data!}
    />
  );
};

export default sentRequest;
