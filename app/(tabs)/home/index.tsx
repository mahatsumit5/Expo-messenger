import { Text, FlatList, RefreshControl, View } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/redux";
import EmptyState from "@/components/EmptyState";
import { postApi } from "@/redux/api/postApi";
import CustomStatusBar from "@/components/CustomStatusBAr";

const Home = () => {
  const { pageForHomePage } = useAppSelector((store) => store.query);
  const dispatch = useAppDispatch();
  const { data: posts, isError } = useGetPostsQuery(pageForHomePage);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    await dispatch(postApi.endpoints.getPosts.initiate(0));
    console.log("refetching");
    setRefresh(false);
  };

  return isError ? (
    <Text>Error Occured</Text>
  ) : (
    <View className="bg-background pb-4 lg:max-w-[570px] mx-auto">
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
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            className="text-foreground"
          />
        }
        bouncesZoom
        bounces
        refreshing
      />
      <CustomStatusBar />
    </View>
  );
};

export default Home;
