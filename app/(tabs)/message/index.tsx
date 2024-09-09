import { View, FlatList, Pressable } from "react-native";
import React, { useState } from "react";

import { useGetAllChatRoomQuery } from "@/redux";
import PeopleAvatar from "@/components/PeopleAvatar";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCurrentRoom } from "@/redux/reducers/roomSlice";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import { P } from "@/components/ui/typography";

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
            className={`bg-muted`}
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
                    size="h-10 w-10"
                  />
                  <View className="mx-2">
                    <P className="font-pmedium ">
                      {item.fName} {item.lName}
                    </P>
                    <P className=" font-pregular">{item.lastMessage}</P>
                  </View>
                </View>
              </View>
              <View>
                <TouchableIcon
                  icon={Icons.camera}
                  onPress={() => {}}
                  iconClassName="w-5 h-5"
                />
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Message;
