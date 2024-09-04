import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImagePickerAsset } from "expo-image-picker";
import { Alert } from "react-native";
import { RNS3 } from "react-native-aws3";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw new Error();
  }
};
export const getToken = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw new Error();
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.clear((err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  } catch (error) {
    throw new Error();
  }
};

export const extractInitial = (fName: string, lName: string): string => {
  return fName.slice(0, 1).toUpperCase() + lName.slice(0, 1).toUpperCase();
};

export const uploadImageToS3 = async (
  data: ImagePickerAsset[] | ImagePickerAsset
) => {
  try {
    const options = {
      keyPrefix: "uploads/",
      bucket: process.env.EXPO_PUBLIC_BUCKET,
      region: process.env.EXPO_PUBLIC_REGION,
      accessKey: process.env.EXPO_PUBLIC_ACCESSKEY,
      secretKey: process.env.EXPO_PUBLIC_SECRETKEY,
    };
    if (Array.isArray(data)) {
      const images = data.map(async (image) => {
        const file = {
          name: image.fileName as string,
          type: image.mimeType as string,
          uri: image.uri,
        };
        const { headers, status } = await RNS3.put(file, options);
        if (status !== 201) {
          throw new Error("Failed to upload image");
        }
        return headers.location;
      });
      return Promise.all(images);
    } else {
      const file = {
        name: data.fileName as string,
        type: data.mimeType as string,
        uri: data.uri,
      };
      const { headers, status } = await RNS3.put(file, options);
      if (status !== 201) {
        throw new Error("Failed to upload image");
      }
      return headers.location as string;
    }
  } catch (error) {
    throw new Error("Unable tp upload image to s3");
  }
};
export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    case diffInDays >= 1 && diffInDays <= 7:
      return `${Math.floor(diffInDays)} days ago`;
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const ErrorAlert = (error: unknown) => {
  if (error instanceof Error) {
    Alert.alert("error", error.message);
  } else {
    throw new Error("Unknown error occured");
  }
};
