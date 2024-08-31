import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  ViewToken,
} from "react-native";
import React, { useRef, useState } from "react";
import PeopleCard from "@/components/PeopleCard";
import { useGetAllUsersQuery } from "@/redux";
import LoadingPeopleCard from "@/components/LoadingPeopleCard";
import HorizontalLoadingScroll from "@/components/HorizontalLoadingScroll";

const Friends = () => {
  const { data, isError, isLoading } = useGetAllUsersQuery({
    page: 1,
    take: 10,
    order: "asc",
    search: "",
  });
  const [activeCard, setActiveCard] = useState(data?.data[0]);
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
        <Text className="font-pmedium text-xl mt-5">Your Friends</Text>
      </View>
      <HorizontalLoadingScroll />
    </ScrollView>
  ) : (
    <ScrollView className=" p-2  ">
      <View>
        <Text className="font-pmedium text-xl">Find New Friends</Text>
      </View>
      <FlatList
        data={data?.data}
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
      <View>
        <Text className="font-pmedium text-xl mt-5">Your Friends</Text>
      </View>
      <FlatList
        data={data?.data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View className="w-80 items-center justify-center  mt-5">
            <PeopleCard
              user={item}
              isInView={item.id === activeCard?.id}
              type="Friend"
            />
          </View>
        )}
        ListEmptyComponent={() => <Text>Empty friends</Text>}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setActiveCard(viewableItems[0].item);
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        horizontal
      />
    </ScrollView>
  );
};

export default Friends;
