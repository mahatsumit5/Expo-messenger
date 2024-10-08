import { View } from "react-native";
import React from "react";
import CustomFlatlist from "@/components/Friends/CustomFlatlist";
import { useGetSentFriendRequestQuery } from "@/redux";
import ViewButton from "@/components/Friends/ViewButton";

const SentRequest = () => {
  const {
    data: sentReq,
    isLoading,
    refetch,
  } = useGetSentFriendRequestQuery({
    page: 1,
    search: "",
  });
  return (
    <View className="items-center bg-background h-full pt-5 lg:max-w-[570px] mx-auto">
      <ViewButton />
      <CustomFlatlist
        type="Sent Request"
        activeTab={"Sent Request"}
        data={sentReq?.data!}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

export default SentRequest;
