import { View } from "react-native";
import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { CameraIcon, ImagePlus } from "@/lib/icons/index";
import LucidIcon from "./icon/LucidIcon";
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
      <View className="absolute top-6 right-28 flex flex-row z-50 ">
        <LucidIcon
          icon={CameraIcon}
          onPress={openCamera}
          className="text-secondary mr-4"
        />
        <LucidIcon
          icon={ImagePlus}
          onPress={pickImage}
          className="text-secondary"
        />
      </View>
    ),
  };
};

export default ImagePickerandCamera;
