import { View, Text, Image } from "react-native";
import React, { FC } from "react";

const PeopleAvatar: FC<{ profilePicture: string | null; initial: string }> = ({
  profilePicture,
  initial,
}) => {
  return (
    <View className="w-24 rounded-full h-24  bg-slate-300 items-center justify-center">
      {profilePicture ? (
        <Image
          source={{ uri: profilePicture }}
          className="h-full w-full rounded-full"
          resizeMode="cover"
        />
      ) : (
        <Text className=" font-pregular text-xl">{initial}</Text>
      )}
    </View>
  );
};

export default PeopleAvatar;
