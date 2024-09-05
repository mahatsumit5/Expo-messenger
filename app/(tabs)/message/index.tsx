import { View, Text, ScrollView, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Test from "@/components/Test";
import { useGetAllChatRoomQuery } from "@/redux";
import PeopleAvatar from "@/components/PeopleAvatar";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCurrentRoom } from "@/redux/reducers/roomSlice";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import { Socket } from "socket.io-client";

const Message = () => {
  const { socket } = useAppSelector((store) => store.socket);
  const { data, isLoading, isError } = useGetAllChatRoomQuery({
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
    <FlatList
      data={data?.data}
      renderItem={({ item }) => (
        <Pressable
          className={hover ? "bg-slate-300" : ""}
          onPressIn={() => setHover(true)}
          onPressOut={() => setHover(false)}
          onPress={() => handleOnPress(item)}
        >
          <View className="flex flex-row justify-between items-center px-2 border-b py-2">
            <View>
              <View className="flex-row items-center">
                <PeopleAvatar
                  initial="SM"
                  profilePicture={item.profile}
                  size="h-10 w-10"
                />
                <View className="mx-2">
                  <Text className="font-pmedium text-lg">
                    {item.fName} {item.lName}
                  </Text>
                  <Text className="text-sm font-pregular">
                    {item.lastMessage}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableIcon icon={Icons.camera} onPress={() => {}} />
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default Message;
