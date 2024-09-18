import { View } from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";

import { useSendMessageMutation } from "@/redux";
import ImagePickerandCamera from "../ImagePicker&Camera";
import { uploadImageToS3 } from "@/lib/amszonS3";
import { ImagePickerAsset } from "expo-image-picker";
import { useAppSelector } from "@/hooks/hooks";
import { Input } from "../ui/input";
import LucidIcon from "../icon/LucidIcon";
import { SendHorizonal } from "@/lib/icons/Send";
import { Button } from "../ui/button";
import LoadingState from "../button/LoadingState";
import { useColorScheme } from "@/lib/useColorScheme";
const MessageInputField: FC<{
  author: string;
  roomId: string;
  numOfMessages: number;
  email: string;
}> = ({ author, roomId, numOfMessages, email }) => {
  const { isDarkColorScheme } = useColorScheme();
  const { socket } = useAppSelector((store) => store.socket);
  const [message, setMessage] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { component, form } = ImagePickerandCamera();

  const handleSendMessage = useCallback(
    async (content: string) => {
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
    },
    [author, numOfMessages, roomId, socket, sendMessage]
  ); // Add any dependencies that `handleSendMessage` uses

  useEffect(() => {
    const uploadImage = async (images: ImagePickerAsset[]) => {
      const url = (await uploadImageToS3(images)) as [];
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
  }, [form, handleSendMessage]);
  return (
    <View className="p-2 pt-4 flex-row relative mb-4 border-t border-border">
      <Input
        className="flex-1  h-8 rounded-lg p-2 bg-input"
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
        keyboardAppearance={isDarkColorScheme ? "dark" : "light"}
      />
      {component}
      <View className="ml-2"></View>
      <Button
        className="flex  rounded-full flex-row gap-2"
        disabled={isLoading}
        variant={"ghost"}
      >
        {!isLoading ? (
          <LucidIcon
            icon={SendHorizonal}
            onPress={() => handleSendMessage(message)}
            size={30}
            className="text-primary"
          />
        ) : (
          <LoadingState />
        )}
      </Button>
    </View>
  );
};

export default MessageInputField;
