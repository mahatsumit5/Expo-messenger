import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/hooks/hooks";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/redux";
import EmptyState from "@/components/EmptyState";

const Home = () => {
  const { data, isError } = useGetPostsQuery(0);

  return (
    <FlatList
      data={data?.posts}
      keyExtractor={(item: IPost) => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
      ListEmptyComponent={() => (
        <EmptyState
          title="No posts available"
          subtitle="Please try again later"
        />
      )}
    />
  );
};

export default Home;
