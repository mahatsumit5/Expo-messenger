import { Text, FlatList, RefreshControl, View } from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/redux";
import EmptyState from "@/components/EmptyState";
import { postApi } from "@/redux/api/postApi";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isError } = useGetPostsQuery(0);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    await dispatch(postApi.endpoints.getPosts.initiate(0));
    setRefresh(false);
  };

  return isError ? (
    <Text>Error Occured</Text>
  ) : (
    <View className="bg-background">
      <FlatList
        data={posts?.posts}
        keyExtractor={(item: IPost) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No posts available"
            subtitle="Please try again later"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        bouncesZoom
        bounces
        refreshing
      />
    </View>
  );
};

export default Home;
