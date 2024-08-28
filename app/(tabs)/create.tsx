import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Inputfield from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import * as ImagePicker from "expo-image-picker";
import EmptyState from "@/components/EmptyState";
import ImageSlider from "@/components/ImageSlider";
import CustomStatusBar from "@/components/CustomStatusBAr";
const initialState: {
  images: ImagePicker.ImagePickerAsset[];
  title: string;
  content: string;
} = {
  images: [],
  title: "",
  content: "",
};
const Profile = () => {
  const [form, setForm] = useState(initialState);
  async function pickImage() {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setForm({ ...form, images: result.assets });
    }
  }
  async function openCamera() {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setForm({ ...form, images: result.assets });
    }
  }

  function handleSubmit() {
    console.log(form);
  }
  return (
    <ScrollView className="px-2 relative bg-background">
      <View>
        <Inputfield
          title="Title"
          onChange={(e) => {
            setForm({ ...form, title: e });
          }}
          placeholder="Enter your Title"
          keyboardType="default"
          value={form.title}
        />
        <Inputfield
          title="Description"
          onChange={(e) => {
            setForm({ ...form, content: e });
          }}
          placeholder="Message"
          keyboardType="default"
          value={form.content}
          inputHeight="h-[150px]"
        />
      </View>
      <View className="absolute top-8 right-0 flex flex-row">
        <TouchableIcon
          onPress={openCamera}
          className="border-2 mt-2"
          icon={Icons.camera}
        />
        <TouchableIcon
          onPress={pickImage}
          className="border-2 mt-2"
          icon={Icons.img}
        />
      </View>

      <ImageSlider images={form.images} />

      <View>
        <CustomButton
          title="Create a post"
          isLoading={false}
          onPress={handleSubmit}
        />
      </View>
      <CustomStatusBar backgroundColor="white" style="dark" hidden={false} />
    </ScrollView>
  );
};

export default Profile;
