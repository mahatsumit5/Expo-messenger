import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/hooks/hooks";
import SmallIconButton from "@/components/SmallconButton";
import Icons from "@/constants/Icons";

const Message = () => {
  const { roomId } = useLocalSearchParams();
  const { room } = useAppSelector((store) => store.room);
  return room?.id ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className=" flex-col h-full justify-between ">
          <View className="p-2 flex-1 bg-red">
            <FlatList data={[]} renderItem={({ item }) => <View></View>} />
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ) : null;
};

export default Message;
