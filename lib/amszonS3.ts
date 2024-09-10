import { ImagePickerAsset } from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

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
    console.log(error);
    throw new Error("Unable tp upload image to s3");
  }
};
