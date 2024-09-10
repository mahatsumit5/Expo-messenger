import { View, FlatList, ViewToken, RefreshControl } from "react-native";
import React, { FC, useState } from "react";

import PeopleCard from "../PeopleCard";
import EmptyState from "../EmptyState";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setPageForAllUsers } from "@/redux/reducers/querySlice";
import { emptyTitle, tabs } from "@/lib/constants";

export type keys = (typeof tabs)[number];
interface props {
  type: keys;
  activeTab: keys;
  data: IFriendReq[] | IUser[] | IChatRoom[];
  refreshing: boolean;
  onRefresh: () => void;
}

const CustomFlatlist: FC<props> = ({
  type,
  activeTab,
  data,
  onRefresh,
  refreshing,
}) => {
  const { takeNumberOfPeopleToDisplay, totalNumberOfUsers, pageForAllUsers } =
    useAppSelector((store) => store.query);
  const totalNumberOfPages = Math.ceil(
    totalNumberOfUsers / takeNumberOfPeopleToDisplay
  );
  const dispatch = useAppDispatch();
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
              <View className="w-full px-2  mt-5">
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
              <View className="w-full px-4  mt-5">
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
              <View className="w-full px-4  mt-5">
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
            <View className="w-full px-4  mt-5">
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
            if (totalNumberOfPages > pageForAllUsers) {
              dispatch(setPageForAllUsers(pageForAllUsers + 1));
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }
        />
      );
  }
};

export default CustomFlatlist;
