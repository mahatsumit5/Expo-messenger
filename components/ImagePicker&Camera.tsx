import { View, Text } from "react-native";
import React, { useState } from "react";
import TouchableIcon from "./TouchableIcon";
import Icons from "@/constants/Icons";
import * as ImagePicker from "expo-image-picker";

const ImagePickerandCamera = () => {
  const [form, setForm] = useState<ImagePicker.ImagePickerAsset[]>();
  async function pickImage() {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setForm(result.assets);
    }
  }
  async function openCamera() {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setForm(result.assets);
    }
  }
  return {
    form,
    component: (
      <View className="absolute top-4 right-28 flex flex-row z-50 h-">
        <TouchableIcon
          onPress={openCamera}
          iconClassName="mr-2 h-6 w-6"
          icon={Icons.camera}
        />
        <TouchableIcon
          onPress={pickImage}
          icon={Icons.img}
          iconClassName="h-6 w-6"
        />
      </View>
    ),
  };
};

export default ImagePickerandCamera;
