import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import TouchableIcon from "./TouchableIcon";
import Icons from "@/constants/Icons";
import HorizontalImageScroll from "./HorizontalImageScroll";
import { router } from "expo-router";
import { dateConverter } from "@/util";

const PostCard: FC<{ post: IPost }> = ({
  post: {
    author: { fName, lName },
    id,
    images,
    likes,
    content,
    title,
    updatedAt,
  },
}) => {
  return (
    <View className="min-h-60 mt-5  shadow-primary shadow-md   bg-card p-3">
      {/* header */}
      <View className="flex justify-between items-center flex-row ">
        <View className="justify-start flex flex-row gap-2">
          <Text className="font-pmedium">
            {fName} {lName}
          </Text>
        </View>
        <View className="justify-end w-1/2 flex flex-row items-center  ">
          <Text className="mr-2 text-gray-500">{dateConverter(updatedAt)}</Text>
          <TouchableIcon
            onPress={() => {}}
            icon={Icons.threeDots}
            className=""
            iconClassName="w-5 h-5"
          />
        </View>
      </View>
      {/* content */}
      <View className="mt-2 mb-5">
        <Text className="font-pmedium text-lg">{title}</Text>
        <Text className="font-pregular text-sm mt-2">{content}</Text>
      </View>
      {/* Image */}
      <HorizontalImageScroll images={images} />
      {/* comment Section */}
      <View className="mt-4 flex flex-row w-full items-center justify-start">
        <Text className="font-pmedium text-xs">1.2K likes</Text>
        <TouchableIcon
          onPress={() => {}}
          icon={Icons.emptyHeart}
          iconClassName="w-5 h-5"
        />
        <Text className="font-pmedium text-xs ml-5">500 comments</Text>

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
          iconClassName="w-5 h-5"
          className=""
        />
      </View>
    </View>
  );
};

export default PostCard;
