import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import CustomStatusBar from "@/components/CustomStatusBAr";
import { avatar, coverImg } from "@/constants/images";
import AvatarIcon from "@/components/AvatarIcon";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import { removeToken } from "@/util";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useGetPostsByUserQuery, useGetPostsQuery } from "@/redux";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import { StatusBar } from "expo-status-bar";
import { useAppSelector } from "@/hooks/hooks";
const profile = () => {
  const { user } = useAppSelector((store) => store.user);
  const { data: posts, isError } = useGetPostsByUserQuery(user?.id as string);

  const logout = async () => {
    await removeToken();
    router.push("/(auth)/sign-in");
  };

  function handleOnEdit() {
    router.navigate("/(tabs)/profile/edit");
  }
  return (
    <View className="h-full  ">
      {/* Avatar */}

      <View className=" items-center">
        <FlatList
          data={posts?.posts}
          keyExtractor={(item: IPost) => item.id}
          renderItem={({ item }) => (
            <View className="">
              <PostCard post={item} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No posts available"
              subtitle="Please try again later"
            />
          )}
          ListHeaderComponent={() => (
            <View className="  relative h-[420px]">
              {user?.coverPicture ? (
                <View className="h-56">
                  <Image
                    source={{ uri: user?.coverPicture }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <View className="h-56">
                  <Image
                    source={coverImg}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
              )}
              <View className="absolute top-5 right-5">
                <TouchableIcon icon={Icons.logout} onPress={logout} />
              </View>
              {/* information */}
              <View className="items-center absolute top-1/3 w-full">
                <View className="w-full  p-2 items-center gap-2">
                  <View className="w-32 rounded-full bg-black h-32">
                    {user?.profile ? (
                      <Image
                        source={{ uri: user.profile }}
                        resizeMode="cover"
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <Image
                        source={avatar}
                        resizeMode="cover"
                        className="w-full h-full rounded-full"
                      />
                    )}
                  </View>
                  <View>
                    <Text className="font-pmedium text-lg">
                      {user?.fName} {user?.lName}
                    </Text>
                  </View>

                  <View className="flex flex-row  items-center justify-center ">
                    <Text className="font-pregular text-base">20 posts</Text>
                    <Text className="px-2 text-base font-pregular">
                      120 friends
                    </Text>
                  </View>
                </View>

                <Text className="mt-2 text-xl font-pbold">My Posts</Text>
              </View>
              {/* edit button */}
              <View className="  mt-2  items-end px-4">
                <TouchableIcon
                  icon={Icons.edit}
                  onPress={() => {
                    router.navigate("/profile/edit");
                  }}
                  className=""
                  iconClassName="w-7 h-7  rounded-full"
                />
              </View>
            </View>
          )}
        />
      </View>
      <StatusBar hidden={true} backgroundColor="" style="light" />
    </View>
  );
};

export default profile;
