import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { avatar, coverImg } from "@/constants/images";

import { removeToken } from "@/util";
import { router } from "expo-router";
import { useGetPostsByUserQuery } from "@/redux";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import { useAppSelector } from "@/hooks/hooks";
import LucidIcon from "@/components/icon/LucidIcon";
import { Edit } from "@/lib/icons/Edit";
import { LogOutIcon } from "@/lib/icons/Logout";
import { H3 } from "@/components/ui/typography";
import CustomStatusBar from "@/components/CustomStatusBAr";
const Profile = () => {
  const { user } = useAppSelector((store) => store.user);
  const { data: posts } = useGetPostsByUserQuery(user?.id as string);

  const logout = async () => {
    await removeToken();
    router.push("/(auth)/sign-in");
  };

  return (
    <View className="h-full  bg-background lg:max-w-[570px] mx-auto">
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
            <View className="  relative h-[310px]">
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
                <LucidIcon
                  icon={LogOutIcon}
                  onPress={logout}
                  className="text-primary"
                />
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
                    <H3 className="font-pmedium  text-foreground">
                      {user?.fName} {user?.lName}
                    </H3>
                  </View>

                  <View className="flex flex-row  items-center justify-center ">
                    <Text className="font-pregular text-base text-foreground">
                      20 posts
                    </Text>
                    <Text className="px-2 text-base font-pregular text-foreground">
                      120 friends
                    </Text>
                  </View>
                </View>

                <Text className="mt-2 text-xl font-pbold text-foreground">
                  My Posts
                </Text>
              </View>
              {/* edit button */}
              <View className="  items-end px-4">
                <LucidIcon
                  onPress={() => {
                    router.navigate("/profile/edit");
                  }}
                  icon={Edit}
                  className="text-primary"
                />
              </View>
            </View>
          )}
        />
      </View>
      <CustomStatusBar hidden />
    </View>
  );
};

export default Profile;
