import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetCommentsQuery } from "@/redux";
import Inputfield from "@/components/Inputfield";
import EmptyState from "@/components/EmptyState";
import TouchableIcon from "@/components/TouchableIcon";
import AvatarIcon from "@/components/AvatarIcon";
import { extractInitial } from "@/util";

const Comment = () => {
  const { comment } = useLocalSearchParams();

  const {
    data: comments,
    isError,
    isLoading,
  } = useGetCommentsQuery(comment as string);
  return isError ? (
    <Text>Error</Text>
  ) : isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={comments?.comments}
      keyExtractor={(item: IComment) => item.id}
      ListEmptyComponent={() => (
        <EmptyState
          subtitle="Start a conversation"
          title="No Comments available"
        />
      )}
      renderItem={({ item }) => <SingleComment comment={item} />}
      ListHeaderComponent={() => {
        return <Text className="p-4 font-pbold text-xl">Comments</Text>;
      }}
      ListFooterComponent={() => {
        return (
          <Inputfield
            placeholder="Add a comment"
            title=""
            keyboardType="default"
            value=""
            onChange={() => {}}
            otherFields=" mx-auto p-2"
          />
        );
      }}
    />
  );
};

const SingleComment = ({ comment }: { comment: IComment }) => {
  return (
    <View className="w-full   justify-between  p-4  gap-4">
      <View className="justify-between items-center w-full flex-row">
        <View className="flex-row gap-2  items-center justify-center ">
          <AvatarIcon
            initial={extractInitial(comment.author.fName, comment.author.lName)}
          />
          <Text className="font-psemibold text-base mb-3">
            {comment.author.fName} {comment.author.lName}
          </Text>
        </View>
        <View>
          <Text>buttons</Text>
        </View>
      </View>

      <Text className="font-pregular pl-11">{comment.content}</Text>
    </View>
  );
};
export default Comment;
