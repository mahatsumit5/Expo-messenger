import { View, Text, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/hooks/hooks";
import SmallIconButton from "@/components/SmallconButton";
import Icons from "@/constants/Icons";

const Message = () => {
  const { roomId } = useLocalSearchParams();
  const { room } = useAppSelector((store) => store.room);
  return room?.id ? (
    <View className="h-full justify-between ">
      <View className="p-2">
        <Text>Message Display</Text>
      </View>
      <View className="p-2  flex-row ">
        <TextInput
          className="flex-1  h-10 rounded-md p-2 bg-slate-300"
          placeholder="enter you message"
          placeholderTextColor={"gray"}
        />
        <View className="ml-2">
          <SmallIconButton
            icon={Icons.send}
            title="Send"
            onPress={() => {}}
            variant="bg-primary"
          />
        </View>
      </View>
    </View>
  ) : null;
};

export default Message;
