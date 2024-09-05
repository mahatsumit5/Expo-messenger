import { View, Text, TextInput } from "react-native";
import React, { FC, useEffect, useState } from "react";
import SmallIconButton from "../SmallconButton";
import Icons from "@/constants/Icons";
import { useSendMessageMutation } from "@/redux";
import ImagePickerandCamera from "../ImagePicker&Camera";
import { uploadImageToS3 } from "@/util";
import { ImagePickerAsset } from "expo-image-picker";
import { useAppSelector } from "@/hooks/hooks";
import { Socket } from "socket.io-client";

const MessageInputField: FC<{
  author: string;
  roomId: string;
  numOfMessages: number;
  email: string;
}> = ({ author, roomId, numOfMessages, email }) => {
  const { socket } = useAppSelector((store) => store.socket);
  const [message, setMessage] = useState("");
  const [sendMessage, { isError, isLoading }] = useSendMessageMutation();
  const { component, form } = ImagePickerandCamera();

  async function handleSendMessage(content: string) {
    const { data } = await sendMessage({
      content,
      author,
      numOfMessages,
      roomId,
    });
    if (data?.status) {
      socket?.emit("send_message", data.result, roomId);
      setMessage("");
    }
  }

  const uploadImage = async (images: ImagePickerAsset[]) => {
    const url = await uploadImageToS3(images);
    if (url.length) {
      for (let index = 0; index < url.length; index++) {
        const imageUrl = url[index];
        handleSendMessage(imageUrl);
      }
    }
  };
  useEffect(() => {
    if (form?.length) {
      uploadImage(form);
    }
  }, [form]);
  return (
    <View className="p-2  flex-row relative">
      <TextInput
        className="flex-1  h-10 rounded-md p-2 bg-slate-300"
        placeholder="enter you message"
        placeholderTextColor={"gray"}
        onChangeText={(e) => setMessage(e)}
        value={message}
        onFocus={() => {
          socket?.emit("typing", roomId, email);
        }}
        onBlur={() => {
          socket?.emit("stopped_typing", roomId, email);
        }}
      />
      {component}
      <View className="ml-2">
        <SmallIconButton
          icon={Icons.send}
          title="Send"
          onPress={() => handleSendMessage(message)}
          variant="bg-primary"
          disabled={isLoading}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default MessageInputField;
