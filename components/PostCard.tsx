import { View, Text, Alert } from "react-native";
import React, { FC } from "react";

import HorizontalImageScroll from "./HorizontalImageScroll";
import { router } from "expo-router";
import { dateConverter } from "@/lib/utils";
import PeopleAvatar from "./PeopleAvatar";
import { Heart } from "@/lib/icons/Heart";
import { MessageCircleIcon } from "@/lib/icons/Message";
import LucidIcon from "./icon/LucidIcon";
import { Dropdown } from "@/components/Dropdown";
const PostCard: FC<{ post: IPost }> = ({
  post: {
    author: { fName, lName, profile },
    id,
    images,
    likes,
    content,
    title,
    updatedAt,
  },
}) => {
  return (
    <View className="bg-card mt-5 p-4 mx-2 rounded-xl">
      {/* header */}
      <View className="flex justify-between items-center flex-row  p-2 ">
        <View className="justify-start flex flex-row gap-2">
          <PeopleAvatar
            profilePicture={profile ?? ""}
            size="h-10 w-10"
            initial="sm"
          />
          <Text className="font-pmedium text-card-foreground">
            {fName} {lName}
          </Text>
        </View>
        <View className="justify-end w-1/2 flex flex-row items-center  ">
          <Text className="mr-2 text-gray-500">{dateConverter(updatedAt)}</Text>
          <Dropdown />
        </View>
      </View>
      {/* content */}
      <View className="mt-2 mb-2 flex-1">
        <Text className="font-pmedium text-xl text-card-foreground">
          {title}
        </Text>
        <Text className="font-pregular text-sm mt-2 text-card-foreground">
          {content}
        </Text>
      </View>

      {/* Image */}
      <HorizontalImageScroll images={images} />
      {/* comment Section */}
      <View className="mt-2 flex flex-row w-full items-center justify-start gap-3">
        <View className="flex flex-row">
          <LucidIcon
            icon={Heart}
            onPress={() => {
              Alert.alert("Success", "you like this post");
            }}
          />
          <Text className="font-pmedium text-md text-card-foreground ml-2">
            1.2K likes
          </Text>
        </View>

        <View className="flex flex-row">
          <LucidIcon
            icon={MessageCircleIcon}
            onPress={() => {
              router.navigate({
                pathname: "/(tabs)/home/[comment]",
                params: {
                  comment: id,
                },
              });
            }}
          />
          <Text className="font-pmedium text-md ml-2 text-card-foreground">
            500 comments
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
