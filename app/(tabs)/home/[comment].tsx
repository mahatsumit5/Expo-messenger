import { View, FlatList, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetCommentsQuery } from "@/redux";
import EmptyState from "@/components/EmptyState";

import { Large } from "@/components/ui/typography";

import ErrorComment from "@/components/Comment/ErrorComment";
import CommentLoading from "@/components/Comment/CommentLoading";
import { SingleComment } from "@/components/Comment/SingleComment";
import { InputField } from "@/components/Comment/CommentInputField";
const Comment = () => {
  const { comment } = useLocalSearchParams();

  const {
    data: comments,
    isError,
    isLoading,
  } = useGetCommentsQuery(comment as string);

  return isError ? (
    <ErrorComment />
  ) : isLoading ? (
    <CommentLoading />
  ) : (
    <KeyboardAvoidingView
      className=" h-full justify-between "
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      <View className="flex-1">
        <FlatList
          data={comments}
          keyExtractor={(item: IComment) => item.id}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Comments available"
              subtitle="Start a conversation"
            />
          )}
          renderItem={({ item }) => <SingleComment comment={item} />}
          ListHeaderComponent={() => {
            return (
              <View className="bg-header">
                <Large className="p-4 font-pregular text-center">
                  Comments
                </Large>
              </View>
            );
          }}
          scrollEnabled={true}
        />
      </View>
      <View>
        <InputField />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Comment;
