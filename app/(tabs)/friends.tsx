import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  ViewToken,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import PeopleCard from "@/components/PeopleCard";
import { useGetAllUsersQuery, useGetSentFriendRequestQuery } from "@/redux";
import LoadingPeopleCard from "@/components/LoadingPeopleCard";
import HorizontalLoadingScroll from "@/components/HorizontalLoadingScroll";
import EmptyState from "@/components/EmptyState";

const tabs = ["Friends", "Request", "Sent Request"] as const;
const emptyTitle: Record<
  (typeof tabs)[number],
  { title: string; subtitle: string }
> = {
  Request: { title: "You do not have any friend request.", subtitle: "" },
  Friends: {
    title: "No friends available",
    subtitle: "Please try gain later",
  },
  "Sent Request": {
    title: "No request sent",
    subtitle: "",
  },
} as const;
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
  console.log(sentReq?.data);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const [activeCard, setActiveCard] = useState(allUsers?.data[0]);

  const data: Record<(typeof tabs)[number], IUser[] | IFriendReq[]> = {
    Request: [],
    "Sent Request": sentReq?.data!,
    Friends: [],
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<IUser>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveCard(viewableItems[0].item);
    }
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
      <FlatList
        data={data[activeTab] as IFriendReq[] 
        keyExtractor={(item) => (item.id ? item.id : item.id)}
        renderItem={({ item }) => {
          return (
            <View className="w-96 items-center justify-center">
              <PeopleCard
                user={item?item:item.}
                isInView={item.id === activeCard?.id}
                type={activeTab}
              />
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title={emptyTitle[activeTab].title}
            subtitle={emptyTitle[activeTab].subtitle}
          />
        )}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setActiveCard(viewableItems[0].item);
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        horizontal
      />
      <View className="mt-5">
        <Text className="font-pmedium text-xl">Peoples</Text>
      </View>
      <FlatList
        data={allUsers?.data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View className="w-80  mt-5">
            <PeopleCard
              user={item}
              isInView={item.id === activeCard?.id}
              type="NewUser"
            />
          </View>
        )}
        ListEmptyComponent={() => <Text>Empty friends</Text>}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        horizontal
      />
    </ScrollView>
  );
};

export default Friends;
