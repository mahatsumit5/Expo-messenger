import { View, Text, Image } from "react-native";
import React, { FC } from "react";

const PeopleAvatar: FC<{
  profilePicture: string | null;
  initial: string;
  size?: string;
}> = ({ profilePicture, size = "h-28 w-28", initial }) => {
  return (
    <View
      className={`${size} rounded-full   bg-slate-300 items-center justify-center`}
    >
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
