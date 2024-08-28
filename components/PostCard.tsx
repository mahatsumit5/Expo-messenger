import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import TouchableIcon from "./TouchableIcon";
import Icons from "@/constants/Icons";
import HorizontalImageScroll from "./HorizontalImageScroll";
import { router } from "expo-router";

const PostCard: FC<{ post: IPost }> = ({
  post: {
    author: { fName, lName },
    id,
    images,
    likes,
    content,
    title,
  },
}) => {
  return (
    <View className="min-h-60 m-2   shadow-primary shadow-md rounded-lg p-2 bg-card">
      {/* header */}
      <View className="flex justify-between items-center flex-row">
        <View className="justify-start flex flex-row gap-2">
          <Text className="font-pmedium">
            {fName} {lName}
          </Text>
        </View>
        <View className="justify-start flex flex-row items-center ">
          <Text className="mr-2 text-gray-500">Time</Text>
          <TouchableIcon onPress={() => {}} icon={Icons.threeDots} />
        </View>
      </View>
      {/* content */}
      <View className="mt-2">
        <Text className="font-pmedium text-lg">{title}</Text>
        <Text className="font-pregular text-sm">{content}</Text>
      </View>
      {/* Image */}
      <HorizontalImageScroll images={images} />
      {/* comment Section */}
      <View className="mt-4 flex flex-row w-full items-center justify-center">
        <Text className="font-pmedium text-xs">1.2K likes</Text>
        <TouchableIcon onPress={() => {}} icon={Icons.emptyHeart} />
        <Text className="font-pmedium text-xs">500 comments</Text>

        <TouchableIcon
          onPress={() => {
            router.navigate({
              pathname: "/(tabs)/home/[comment]",
              params: {
                comment: id,
              },
            });
          }}
          icon={Icons.comment}
        />
      </View>
    </View>
  );
};

export default PostCard;
