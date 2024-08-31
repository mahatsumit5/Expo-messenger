import { View, Text } from "react-native";
import React, { FC } from "react";
import PeopleAvatar from "./PeopleAvatar";
import TouchableIcon from "./TouchableIcon";
import Icons from "@/constants/Icons";

const PeopleCard: FC<{ user: IUser }> = ({ user }) => {
  function handleAddFriend() {}
  return (
    <View className="min-h-[300px] border border-slate-300 p-2 w-full rounded-md items-center justify-start flex py-8">
      <PeopleAvatar initial="SM" profilePicture={user.profile} />
      <Text className="mt-3 text-lg font-pmedium uppercase">Sumit Mahat</Text>
      <Text className="mt-1 text-sm font-pregular">mahatsumit5@gmail.com</Text>
      <View className="flex flex-row">
        <View className="flex flex-row mt-2">
          <Text className="font-pbold text-base">200 </Text>
          <Text className="font-pregular text-base"> followers</Text>
        </View>
        <View className="flex flex-row mt-2 ml-4">
          <Text className="font-pbold text-base">50 </Text>
          <Text className="font-pregular text-base"> posts</Text>
        </View>
      </View>
      <View className="mt-2 ">
        <Text className="text-sm font-plight text-gray-500 text-center">
          Add your social media bio here to let people know what you do{" "}
        </Text>
      </View>
      {/* to do customise according to your needs */}
      <View className="mt-4 w-full items-center">
        <View className="bg-primary w-1/2 items-center p-2 rounded-2xl flex flex-row justify-center">
          <TouchableIcon
            icon={Icons.addFriend}
            onPress={handleAddFriend}
            className=""
          />
          <Text className="text-primary-foreground text-md font-pmedium ml-2">
            Add friend
          </Text>
        </View>
        {/* <TouchableIcon /> */}
      </View>
    </View>
  );
};

export default PeopleCard;
