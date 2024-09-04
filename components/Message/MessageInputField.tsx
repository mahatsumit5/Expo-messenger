import { View, Text, TextInput } from "react-native";
import React, { FC, useEffect, useState } from "react";
import SmallIconButton from "../SmallconButton";
import Icons from "@/constants/Icons";
import { useSendMessageMutation } from "@/redux";
import ImagePickerandCamera from "../ImagePicker&Camera";
import { uploadImageToS3 } from "@/util";
import { ImagePickerAsset } from "expo-image-picker";

const MessageInputField: FC<{
  author: string;
  roomId: string;
  numOfMessages: number;
}> = ({ author, roomId, numOfMessages }) => {
  const [message, setMessage] = useState("");
  const [sendMessage, { isError, isLoading }] = useSendMessageMutation();
  const { component, form } = ImagePickerandCamera();

  async function handleSendMessage() {
    const { data } = await sendMessage({
      content: message,
      author,
      numOfMessages,
      roomId,
    });
    if (data?.status) {
      setMessage("");
    }
  }

  const uploadImage = async (images: ImagePickerAsset[]) => {
    const url = await uploadImageToS3(images);
    if (url.length) {
      for (let index = 0; index < url.length; index++) {
        const imageUrl = url[index];
        sendMessage({
          content: imageUrl,
          author,
          numOfMessages,
          roomId,
        });
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
      />
      {component}
      <View className="ml-2">
        <SmallIconButton
          icon={Icons.send}
          title="Send"
          onPress={handleSendMessage}
          variant="bg-primary"
          disabled={isLoading}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default MessageInputField;
