import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetFriendRequestQuery,
  useGetSentFriendRequestQuery,
} from "@/redux";
import HorizontalLoadingScroll from "@/components/HorizontalLoadingScroll";
import CustomFlatlist from "@/components/CustomFlatlist";

export const tabs = ["Friends", "Request", "Sent Request", "allUsers"] as const;

const Friends = () => {
  const {
    data: allUsers,
    isError,
    isLoading,
  } = useGetAllUsersQuery({
    page: 1,
    take: 10,
    order: "asc",
    search: "",
  });

  const { data: sentReq } = useGetSentFriendRequestQuery({
    page: 1,
    search: "",
  });

  const { data: friendReq } = useGetFriendRequestQuery();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const data: Record<(typeof tabs)[number], React.ReactNode> = {
    Request: (
      <CustomFlatlist
        type="Request"
        activeTab={activeTab}
        data={friendReq?.data.result ?? []}
      />
    ),
    "Sent Request": (
      <CustomFlatlist
        type="Sent Request"
        activeTab={activeTab}
        data={sentReq?.data!}
      />
    ),
    Friends: <CustomFlatlist type="Friends" activeTab={activeTab} data={[]} />,
    allUsers: (
      <CustomFlatlist
        type="allUsers"
        activeTab={"allUsers"}
        data={allUsers?.data!}
      />
    ),
  };

  return isError ? (
    <View>
      <Text>Erro occured</Text>
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
      <View className="flex-row gap-5">
        {tabs.map((item) => (
          <Pressable
            className={`p-2 rounded-md ${
              item === activeTab ? "bg-slate-300/50" : ""
            }`}
            key={item}
            onPress={() => {
              setActiveTab(item);
            }}
          >
            <Text className="font-pmedium text-md text-primary"> {item}</Text>
          </Pressable>
        ))}
      </View>
      {data[activeTab]}
      <View className="mt-5">
        <Text className="font-pmedium text-xl">Peoples</Text>
      </View>
      {data.allUsers}
    </ScrollView>
  );
};

export default Friends;
