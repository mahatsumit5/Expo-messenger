import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  RefreshControl,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useGetMessagesQuery } from "@/redux";
import PeopleAvatar from "@/components/PeopleAvatar";
import { extractInitial } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";
import MessageInputField from "@/components/Message/MessageInputField";
import { setSkipNumberOfMessages } from "@/redux/reducers/querySlice";
import { messageApi } from "@/redux/api/messageApi";
import { router } from "expo-router";

const Message = () => {
  const dispatch = useAppDispatch();
  const { room } = useAppSelector((store) => store.room);
  const { user } = useAppSelector((store) => store.user);
  const { skipNumberOfMessages, numberOfMessageToDisplay } = useAppSelector(
    (store) => store.query
  );

  const { data, isLoading } = useGetMessagesQuery({
    roomId: room?.id ?? "",
    take: numberOfMessageToDisplay,
    skip: skipNumberOfMessages,
  });
  return room?.id ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-background"
      keyboardVerticalOffset={90}
    >
      <View className=" flex-col h-full justify-between pb-4">
        <View className="p-2 flex-1 bg-background h-[90%]">
          <FlatList
            data={data?.result.messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View
                  className={` mt-2 ${
                    item.author === room.userId
                      ? " flex-row"
                      : "flex-row-reverse"
                  }`}
                >
                  <PeopleAvatar
                    initial={extractInitial(room.fName, room.lName)}
                    profilePicture={
                      item.author === room.userId
                        ? room.profile ?? ""
                        : user?.profile!
                    }
                    size="w-10 h-10"
                  />
                  <View
                    className={`${
                      item.author === room.userId
                        ? "bg-slate-200  "
                        : "bg-primary "
                    } rounded-xl mx-2`}
                  >
                    {item.content.includes("https://cfw-image-bucket.s3") ? (
                      <Pressable
                        onPress={() => {
                          router.navigate({
                            pathname: "/(tabs)/message/image/[uri]",
                            params: { uri: item.content },
                          });
                        }}
                      >
                        <Image
                          source={{ uri: item.content }}
                          className="h-48 w-48 rounded-md"
                          resizeMethod="auto"
                          resizeMode="cover"
                        />
                      </Pressable>
                    ) : (
                      <Text
                        className={`${
                          item.author === room.userId
                            ? "text-left "
                            : "text-right text-white"
                        } p-4 font-pregular text-[15px]`}
                      >
                        {item.content}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState
                title="No Message"
                subtitle="Be the first one to message"
              />
            )}
            onEndReached={() => {
              if (
                skipNumberOfMessages + 20 <
                Number(data?.result._count.messages)
              ) {
                dispatch(setSkipNumberOfMessages(skipNumberOfMessages + 20));
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  // todo cannot refetch as fetching causes multiple items with same ids to be insered in cached data
                  dispatch(
                    messageApi.endpoints.getMessages.initiate({
                      roomId: room.id,
                      take: numberOfMessageToDisplay,
                      skip: skipNumberOfMessages,
                    })
                  );
                }}
              />
            }
            inverted
          />
        </View>
        <MessageInputField
          author={user?.id!}
          numOfMessages={skipNumberOfMessages}
          roomId={room.id}
          email={user?.email!}
        />
      </View>
    </KeyboardAvoidingView>
  ) : null;
};

export default Message;
