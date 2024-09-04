import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Inputfield from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import * as ImagePicker from "expo-image-picker";
import EmptyState from "@/components/EmptyState";
import ImageSlider from "@/components/ImageSlider";
import CustomStatusBar from "@/components/CustomStatusBAr";
import { useAppSelector } from "@/hooks/hooks";
import { useCreatePostMutation } from "@/redux";
import { uploadImageToS3 } from "@/util";
import { router } from "expo-router";
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
  const { user } = useAppSelector((store) => store.user);

  const [createPost, { isError, isLoading, status }] = useCreatePostMutation();
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

  async function handleSubmit() {
    let imgurl;
    try {
      if (form.images) {
        imgurl = (await uploadImageToS3(form.images)) as string[];
      }

      const { status } = await createPost({
        content: form.content,
        title: form.title,
        id: user?.id as string,
        images: imgurl ?? [],
      }).unwrap();

      if (status) {
        Alert.alert("Success", "New post created");

        router.navigate("/(tabs)/home");
      }
    } catch (error) {
      Alert.alert("error", "Unexpected error occured");
    } finally {
      setForm({ content: "", images: [], title: "" });
    }
  }
  return !isError ? (
    <KeyboardAvoidingView behavior="padding" className="">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-2 relative bg-background">
          <View className="my-10">
            <View className="mb-10">
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
                iconClassName="mr-5 h-8 w-8"
                icon={Icons.camera}
              />
              <TouchableIcon
                onPress={pickImage}
                icon={Icons.img}
                iconClassName="h-8 w-8"
              />
            </View>

            <View className="">
              <ImageSlider images={form.images} onPress={() => {}} />
            </View>

            <View>
              <CustomButton
                title="Create a post"
                isLoading={isLoading}
                onPress={handleSubmit}
                disabled={!form.title || !form.content}
              />
            </View>
            <CustomStatusBar
              backgroundColor="white"
              style="dark"
              hidden={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ) : (
    <Text>Error Occured</Text>
  );
};

export default Profile;
