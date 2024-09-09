import { View } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { useSendMessageMutation } from "@/redux";
import ImagePickerandCamera from "../ImagePicker&Camera";
import { uploadImageToS3 } from "@/util";
import { ImagePickerAsset } from "expo-image-picker";
import { useAppSelector } from "@/hooks/hooks";
import { Input } from "../ui/input";
import LucidIcon from "../icon/LucidIcon";
import { SendHorizonal } from "@/lib/icons/Send";
import { Button } from "../ui/button";
const MessageInputField: FC<{
  author: string;
  roomId: string;
  numOfMessages: number;
  email: string;
}> = ({ author, roomId, numOfMessages, email }) => {
  const { socket } = useAppSelector((store) => store.socket);
  const [message, setMessage] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
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

  useEffect(() => {
    const uploadImage = async (images: ImagePickerAsset[]) => {
      const url = await uploadImageToS3(images);
      if (url.length) {
        for (let index = 0; index < url.length; index++) {
          const imageUrl = url[index];
          handleSendMessage(imageUrl);
        }
      }
    };
    if (form?.length) {
      uploadImage(form);
    }
  }, [form]);
  return (
    <View className="p-2  flex-row relative mb-7">
      <Input
        className="flex-1  h-10 rounded-full p-2 bg-input"
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
      <View className="ml-2"></View>
      <Button
        onPress={() => handleSendMessage(message)}
        className="flex  rounded-full flex-row gap-2"
        disabled={isLoading}
        variant={"outline"}
      >
        <LucidIcon icon={SendHorizonal} onPress={() => {}} />
      </Button>
    </View>
  );
};

export default MessageInputField;
