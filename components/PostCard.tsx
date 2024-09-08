import { View, Text, Image, Animated, StyleSheet, Alert } from "react-native";
import React, { FC } from "react";
import TouchableIcon from "./TouchableIcon";
import Icons from "@/constants/Icons";
import HorizontalImageScroll from "./HorizontalImageScroll";
import { router } from "expo-router";
import { dateConverter } from "@/util";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useDeletePostMutation } from "@/redux";
import PeopleAvatar from "./PeopleAvatar";

function LegacyLeftAction(prog: any, drag: any, id: string) {
  prog.addListener((value: any) => {
    console.log("[L] showLeftProgress:", value.value);
  });
  drag.addListener((value: any) => {
    console.log("[L] appliedTranslation:", value.value);
  });

  const trans = Animated.subtract(drag, 50);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: trans }],
        },
      ]}
      className={"bg-success w-16"}
    >
      <Text> left</Text>
    </Animated.View>
  );
}

function LegacyRightAction(prog: any, drag: any, id: string) {
  const trans = Animated.add(drag, 56);
  const deletePostHandle = async () => {
    try {
    } catch (error) {
      throw new Error("Unable to delete post");
    }
  };
  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: trans }],
        },
      ]}
      className={"bg-destructive w-14 justify-center items-center "}
    >
      <View className="items-center justify-center">
        <TouchableIcon icon={Icons.deleteIcon} onPress={deletePostHandle} />
        <Text className="mt-2 font-pregular text-destructive-foreground">
          Delete
        </Text>
      </View>
    </Animated.View>
  );
}
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
    <GestureHandlerRootView>
      <Swipeable
        containerStyle={{
          height: "auto",
          backgroundColor: "white",
          padding: 12,
          marginTop: 5,
          minHeight: 180,
          alignContent: "space-between",
        }}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={(x, y) => LegacyLeftAction(x, y, id)}
        renderRightActions={(x, y) => LegacyRightAction(x, y, id)}
        userSelect="auto"
      >
        {/* header */}
        <View className="flex justify-between items-center flex-row  p-2">
          <View className="justify-start flex flex-row gap-2">
            <PeopleAvatar
              profilePicture={profile}
              size="h-10 w-10"
              initial="sm"
            />
            <Text className="font-pmedium">
              {fName} {lName}
            </Text>
          </View>
          <View className="justify-end w-1/2 flex flex-row items-center  ">
            <Text className="mr-2 text-gray-500">
              {dateConverter(updatedAt)}
            </Text>
            <TouchableIcon
              onPress={() => {}}
              icon={Icons.threeDots}
              className=""
              iconClassName="w-5 h-5"
            />
          </View>
        </View>
        {/* content */}
        <View className="mt-2 mb-5 flex-1">
          <Text className="font-pmedium text-xl">{title}</Text>
          <Text className="font-pregular text-sm mt-2">{content}</Text>
        </View>
        {/* Image */}
        <HorizontalImageScroll images={images} />
        {/* comment Section */}
        <View className="mt-5 flex flex-row w-full items-center justify-start">
          <Text className="font-pmedium text-md">1.2K likes</Text>
          <TouchableIcon
            onPress={() => {}}
            icon={Icons.emptyHeart}
            iconClassName="w-6 h-6"
          />
          <Text className="font-pmedium text-md ml-5">500 comments</Text>

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
            iconClassName="w-6 h-6"
            className=""
          />
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default PostCard;
