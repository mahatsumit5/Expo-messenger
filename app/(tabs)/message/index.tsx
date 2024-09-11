import { View, FlatList, Pressable } from "react-native";
import React, { useState } from "react";

import { useGetAllChatRoomQuery } from "@/redux";
import PeopleAvatar from "@/components/PeopleAvatar";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCurrentRoom } from "@/redux/reducers/roomSlice";
import { Large, P } from "@/components/ui/typography";
import { CameraIcon, EllipsisVertical } from "@/lib/icons/index";
import LucidIcon from "@/components/icon/LucidIcon";
const Message = () => {
  const { socket } = useAppSelector((store) => store.socket);
  const { data } = useGetAllChatRoomQuery({
    page: 1,
    search: "",
    take: 10,
  });
  const dispatch = useAppDispatch();

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
  return (
    <View className="bg-background h-full ">
      <FlatList
        data={data?.data}
        renderItem={({ item }) => (
          <Pressable
            className={`${hover ? "bg-card" : ""} mt-4`}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={() => handleOnPress(item)}
          >
            <View className="flex flex-row justify-between items-center px-2   py-2">
              <View>
                <View className="flex-row items-center">
                  <PeopleAvatar
                    initial="SM"
                    profilePicture={item.profile ?? ""}
                    size="h-16 w-16"
                  />
                  <View className="mx-2">
                    <Large className=" ">
                      {item.fName} {item.lName}
                    </Large>
                    <View>
                      <P className=" font-pregular">{item.lastMessage}</P>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-3">
                <LucidIcon
                  icon={CameraIcon}
                  onPress={() => {
                    console.log("object");
                  }}
                />
                <LucidIcon icon={EllipsisVertical} />
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Message;
