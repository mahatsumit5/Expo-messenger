import {
  Alert,
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { useAppSelector } from "@/hooks/hooks";
import { uploadImageToS3 } from "@/lib/amszonS3";
import { useUpdateUserMutation } from "@/redux";
import { ErrorAlert } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Large } from "@/components/ui/typography";
import LucidIcon from "@/components/icon/LucidIcon";
import { ImagePlus } from "@/lib/icons/index";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/button/LoadingState";
type imageType = {
  cover: ImagePicker.ImagePickerAsset | null;
  profile: ImagePicker.ImagePickerAsset | null;
};
const Edit = () => {
  const { user } = useAppSelector((store) => store.user);

  const [updateuser, { isLoading }] = useUpdateUserMutation();
  const initialState = {
    fName: user?.fName,
    lName: user?.lName,
    email: user?.email,
    profile: user?.profile,
    bio: user?.bio,
    coverPicture: user?.coverPicture,
    password: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [images, setImages] = useState<imageType>({
    cover: null,
    profile: null,
  });
  const [loading, setloading] = useState(false);
  async function handlePickImage(type: "cover" | "profile") {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });
    if (!result.canceled) {
      switch (type) {
        case "cover":
          setImages({ ...images, cover: result.assets[0] });
          break;
        case "profile":
          setImages({ ...images, profile: result.assets[0] });
          break;
        default:
          Alert.alert("error", "Unexpected error occured");
      }
    }
  }

  async function handleSave() {
    try {
      let cover;
      let profile;
      setloading(true);
      if (images.cover) {
        cover = (await uploadImageToS3(images.cover)) as string;
      }
      if (images.profile) {
        profile = (await uploadImageToS3(images.profile)) as string;
      }
      await updateuser({
        fName: form.fName ?? "",
        lName: form.lName ?? "",
        coverPicture: cover ?? form.coverPicture,
        profile: profile ?? form.profile,
      });
    } catch (error) {
      ErrorAlert(error);
    } finally {
      setloading(false);
    }
  }
  return (
    <KeyboardAvoidingView behavior="height" className="flex-1 bg-background">
      <ScrollView className="px-4 mb-5 bg-background">
        {/* Avatar */}

        <View className="flex mt-5 flex-row  justify-between items-center">
          <Large className="w-fit  font-psemibold text-foreground">
            Avatar
          </Large>

          <View className="flex-1 justify-start max-w-[220px] ">
            <View className="h-24 w-24 rounded-full shadow-lg  items-center bg-slate-300 justify-center">
              {!images.profile ? (
                <LucidIcon
                  onPress={() => handlePickImage("profile")}
                  icon={ImagePlus}
                />
              ) : (
                <Image
                  source={{ uri: images.profile.uri }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        </View>

        <InputFieldComponent
          keyboardType="default"
          title="First Name"
          placeholder="Enter your first name"
          value={form.fName ?? ""}
          editable
          onChangeText={(e) => {
            setForm({ ...form, fName: e });
          }}
        />

        <InputFieldComponent
          keyboardType="default"
          title="Last Name"
          placeholder="Enter your family name"
          value={form.lName ?? ""}
          editable
          onChangeText={(e) => {
            setForm({ ...form, lName: e });
          }}
        />
        <InputFieldComponent
          keyboardType="email-address"
          title="Email"
          placeholder="john.smith@xyz.com"
          value={form.email ?? ""}
          editable={false}
          onChangeText={(e) => {
            setForm({ ...form, email: e });
          }}
        />
        <Large className="mt-5">Bio</Large>

        <Textarea
          keyboardType="default"
          placeholder="Enter your bio"
          value={form.bio ?? ""}
          editable={true}
          onChangeText={(e) => {
            setForm({ ...form, bio: e });
          }}
          className="bg-input mt-2 rounded-xl"
          placeholderTextColor={"gray"}
        />

        <InputFieldComponent
          keyboardType="default"
          title="New Password"
          placeholder="**********"
          value={form.password}
          editable
          onChangeText={(e) => {
            setForm({ ...form, password: e });
          }}
          secureTextEntry
        />
        <InputFieldComponent
          keyboardType="default"
          title="Confirm Password"
          placeholder="***********"
          value={form.confirmPassword}
          editable
          onChangeText={(e) => {
            setForm({ ...form, confirmPassword: e });
          }}
          secureTextEntry
        />

        {!images.cover ? (
          <View className="w-full h-44 items-center justify-center bg-card rounded-md  mt-5 ">
            <LucidIcon
              icon={ImagePlus}
              onPress={() => handlePickImage("cover")}
            />
            <Text className="text-card-foreground font-pregular mt-3">
              Choose your cover image
            </Text>
          </View>
        ) : (
          <View className="h-44 w-full mt-5 rounded-md">
            <Image
              source={{ uri: images.cover.uri }}
              className="w-full h-36 rounded-md"
              resizeMode="cover"
            />
          </View>
        )}
        <Button
          className="mt-2 rounded-lg "
          onPress={handleSave}
          disabled={false}
        >
          {isLoading ? (
            <LoadingState />
          ) : (
            <Large className="text-primary-foreground">Save</Large>
          )}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Edit;
type props = {
  title: string;
  keyboardType: KeyboardTypeOptions;
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  editable: boolean;
  secureTextEntry?: boolean;
};
const InputFieldComponent: FC<props> = ({ title, ...rest }) => {
  return (
    <View className="mt-5 ">
      <Large className="  font-psemibold text-foreground  ">{title}</Large>
      <Input
        className="w-full bg-input rounded-xl mt-3"
        {...rest}
        placeholderTextColor={"gray"}
      />
    </View>
  );
};
