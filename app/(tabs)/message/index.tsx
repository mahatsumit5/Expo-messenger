import { View, FlatList, Pressable, RefreshControl } from "react-native";
import React, { useState } from "react";

import { useGetAllChatRoomQuery } from "@/redux";
import PeopleAvatar from "@/components/PeopleAvatar";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCurrentRoom } from "@/redux/reducers/roomSlice";
import { Large, P } from "@/components/ui/typography";
import { CameraIcon, EllipsisVertical } from "@/lib/icons/index";
import LucidIcon from "@/components/icon/LucidIcon";
import { setPageForAllUsers, setQuery } from "@/redux/reducers/querySlice";
import LoadingRoom from "@/components/Message/LoadingRoom";
const Message = () => {
  const dispatch = useAppDispatch();

  const { socket } = useAppSelector((store) => store.socket);
  const { searchQuery, pageForChatRoom } = useAppSelector(
    (store) => store.query
  );
  const { data, isLoading, isFetching, refetch, isError } =
    useGetAllChatRoomQuery(
      {
        page: pageForChatRoom,
        search: searchQuery,
        take: 10,
      },
      { refetchOnMountOrArgChange: true }
    );
  const [hover, setHover] = useState(false);

  const handleOnPress = (item: IChatRoom) => {
    dispatch(setCurrentRoom(item));
    if (socket) {
      socket.emit("join-room", item.id);
    }
    router.navigate({
      pathname: "/message/[room]",
      params: {
        room: item.id,
      },
    });
  };
  return isLoading || isFetching ? (
    <LoadingRoom />
  ) : !isError ? (
    <View className="bg-background h-full px-2">
      <FlatList
        data={data?.data}
        renderItem={({ item }) => (
          <Pressable
            className={`${hover ? "bg-input rounded-xl" : ""} mt-4 `}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={() => handleOnPress(item)}
          >
            <View className="flex flex-row justify-betweeen items-center  w-full   py-2 ">
              <View>
                <PeopleAvatar
                  initial="SM"
                  profilePicture={item.profile ?? ""}
                  size="h-16 w-16"
                />
              </View>

              <View className="flex-row items-center justify-between  w-[320px]">
                <View className="mx-2">
                  <Large className=" ">
                    {item.fName} {item.lName}
                  </Large>

                  <P className=" font-pregular">{item.lastMessage}</P>
                </View>

                <LucidIcon
                  icon={CameraIcon}
                  onPress={() => {
                    console.log("object");
                  }}
                  className="text-primary"
                />
              </View>
            </View>
          </Pressable>
        )}
        onEndReached={() => {
          // dispatch(setPageForChatRoom(pageForChatRoom + 1));
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              dispatch(setPageForAllUsers(1));
              dispatch(setQuery(""));
              refetch();
            }}
          />
        }
        ListEmptyComponent={() => (
          <View>
            <Large>No rooms available</Large>
          </View>
        )}
      />
    </View>
  ) : (
    <View>
      <Large>Error</Large>
    </View>
  );
};

export default Message;
