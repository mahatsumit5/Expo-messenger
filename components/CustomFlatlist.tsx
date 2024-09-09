import { View, FlatList, ViewToken, Alert } from "react-native";
import React, { FC, useState } from "react";
import EmptyState from "./EmptyState";
import PeopleCard from "./PeopleCard";
import { tabs } from "@/app/(tabs)/friends";

export type keys = (typeof tabs)[number];
interface props {
  type: keys;
  activeTab: keys;
  data: IFriendReq[] | IUser[] | IChatRoom[];
}

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
  allUsers: {
    title: "No users found",
    subtitle: "Try again later",
  },
} as const;
const CustomFlatlist: FC<props> = ({ type, activeTab, data }) => {
  const [activeCardId, setActiveCard] = useState<string>("");

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<IUser>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveCard(viewableItems[0].item.id);
    }
  };

  switch (type) {
    case "Request":
      return (
        <FlatList
          data={data as IFriendReq[]}
          keyExtractor={(item) => item.from.id}
          renderItem={({ item }) => {
            return (
              <View className="w-96 items-center justify-center">
                <PeopleCard
                  user={item.from}
                  isInView={item.from.id === activeCardId}
                  type={"Request"}
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
              setActiveCard(viewableItems[0].item.from.id);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        />
      );
    case "Friends":
      return (
        <FlatList
          data={data as IChatRoom[]}
          renderItem={({ item }) => {
            return (
              <View className="w-96 items-center justify-center">
                <PeopleCard
                  user={{
                    id: item.userId,
                    email: item.email,
                    fName: item.fName,
                    lName: item.lName,
                    profile: item.profile,
                    bio: "",
                    coverPicture: "",
                    isActive: true,
                  }}
                  isInView={item.id === activeCardId}
                  type={"Friends"}
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
              setActiveCard(viewableItems[0].item.id);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        />
      );
    case "Sent Request":
      return (
        <FlatList
          data={data as IFriendReq[]}
          keyExtractor={(item) => item.to.id}
          renderItem={({ item }) => {
            return (
              <View className="w-96 items-center justify-center">
                <PeopleCard
                  user={item.to}
                  isInView={item.to.id === activeCardId}
                  type={"Sent Request"}
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
              setActiveCard(viewableItems[0].item.to.id);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        />
      );
    case "allUsers":
      return (
        <FlatList
          data={data as IUser[]}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View className="w-80  mt-5">
              <PeopleCard
                user={item}
                isInView={item.id === activeCardId}
                type="allUsers"
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title={emptyTitle[activeTab].title}
              subtitle={emptyTitle[activeTab].subtitle}
            />
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
          onEndReached={() => {
            Alert.alert("Todo", "re call data ");
          }}
        />
      );
  }
};

export default CustomFlatlist;
