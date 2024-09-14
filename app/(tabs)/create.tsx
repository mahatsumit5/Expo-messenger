import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import Inputfield from "@/components/Inputfield";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import * as ImagePicker from "expo-image-picker";
import ImageSlider from "@/components/ImageSlider";
import { useAppSelector } from "@/hooks/hooks";
import { useCreatePostMutation } from "@/redux";
import { ErrorAlert } from "@/lib/utils";
import { uploadImageToS3 } from "@/lib/amszonS3";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Muted, P, Small } from "@/components/ui/typography";
import CustomButton from "@/components/button/ShadButton";
import { initialState } from "@/lib/constants";
import { CameraIcon, ImagePlus } from "@/lib/icons/index";
import LoadingState from "@/components/button/LoadingState";
const Profile = () => {
  const { user } = useAppSelector((store) => store.user);

  const [createPost, { isError, isLoading }] = useCreatePostMutation();
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
      ErrorAlert(error);
    } finally {
      setForm({ content: "", images: [], title: "" });
    }
  }
  return !isError ? (
    <KeyboardAvoidingView behavior="padding" className="mt-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-2 relative bg-background h-full">
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
            <View className="absolute top-1 gap-2 right-0 flex flex-row">
              <CustomButton
                icon={CameraIcon}
                onPress={openCamera}
                size={25}
                iconClassName="text-secondary"
                variant={"outline"}
              />
              <CustomButton
                icon={ImagePlus}
                onPress={pickImage}
                size={25}
                iconClassName="text-secondary"
                variant={"outline"}
              />
            </View>

            {/* <View className="w-96 bg-card items-center rounded-lg mx-auto"> */}
            <ImageSlider images={form.images} onPress={pickImage} />
            {/* </View> */}

            <View>
              <Button
                onPress={handleSubmit}
                disabled={!form.title || !form.content || isLoading}
                className="mt-5"
                variant={"default"}
              >
                {!isLoading ? (
                  <P className="font-pbold text-primary-foreground">Create</P>
                ) : (
                  <View className="flex-row justify-center gap-4">
                    <Muted className="text-primary-foreground text-sm">
                      Please wait..
                    </Muted>
                    <LoadingState />
                  </View>
                )}
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ) : (
    <Text>Error Occured</Text>
  );
};

export default Profile;
