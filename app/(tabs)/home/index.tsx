import { Text, FlatList, RefreshControl, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/redux";
import EmptyState from "@/components/EmptyState";
import CustomStatusBar from "@/components/CustomStatusBAr";
import { setPageForHomePage } from "@/redux/reducers/querySlice";
import { postApi } from "@/redux/api/postApi";

const numberOfPostsToDisplay = 2;
const Home = () => {
  const { pageForHomePage } = useAppSelector((store) => store.query);
  const dispatch = useAppDispatch();
  const {
    data: posts,
    isError,
    isLoading,
    refetch,
  } = useGetPostsQuery({ page: pageForHomePage, take: numberOfPostsToDisplay });

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
            refreshing={isLoading}
            onRefresh={() => {
              dispatch(
                postApi.endpoints.getPosts.initiate({
                  page: 1,
                  take: numberOfPostsToDisplay,
                })
              );
            }}
            className="text-foreground"
          />
        }
        onEndReached={() => {
          if (
            numberOfPostsToDisplay * pageForHomePage <
            posts?.totalNumberOfPosts!
          ) {
            dispatch(setPageForHomePage(pageForHomePage + 1));
          }
        }}
      />
      <CustomStatusBar />
    </View>
  );
};

export default Home;
