import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/hooks/hooks";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/redux";

const Home = () => {
  const { data, isError } = useGetPostsQuery(0);

  return (
    <FlatList
      data={data?.posts}
      keyExtractor={(item: IPost) => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
      ListEmptyComponent={() => (
        <View className="">
          <Text className="text-lg font-pmedium text-center">
            No posts available
          </Text>
          <Text className="text-sm text-center text-gray-700  mt-2">
            Please check later.
          </Text>
        </View>
      )}
    />
  );
};

export default Home;
