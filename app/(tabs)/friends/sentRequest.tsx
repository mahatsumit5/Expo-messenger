import { View, Text } from "react-native";
import React from "react";
import CustomFlatlist from "@/components/CustomFlatlist";
import { useGetSentFriendRequestQuery } from "@/redux";

const SentRequest = () => {
  const { data: sentReq } = useGetSentFriendRequestQuery({
    page: 1,
    search: "",
  });
  return (
    <View className="items-center bg-background h-full pt-5">
      <CustomFlatlist
        type="Sent Request"
        activeTab={"Sent Request"}
        data={sentReq?.data!}
      />
    </View>
  );
};

export default SentRequest;
