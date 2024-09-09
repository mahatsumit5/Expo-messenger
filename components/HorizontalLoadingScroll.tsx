import { View, FlatList } from "react-native";
import React from "react";
import LoadingPeopleCard from "./LoadingPeopleCard";

const HorizontalLoadingScroll = () => {
  return (
    <FlatList
      data={Array(3).fill("")}
      keyExtractor={(item, index) => index + ""}
      renderItem={() => (
        <View className="w-80  mt-5 h-72 ml-10">
          <LoadingPeopleCard />
        </View>
      )}
    />
  );
};

export default HorizontalLoadingScroll;
