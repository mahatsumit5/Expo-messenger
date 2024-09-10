import { Text } from "react-native";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const PeopleAvatar: FC<{
  profilePicture: string;
  initial: string;
  size?: string;
}> = ({ profilePicture, initial, size = "h-10 w-10" }) => {
  return (
    <Avatar alt=" Avatar" className={`${size}`}>
      <AvatarImage source={{ uri: profilePicture }} className={`${size}`} />
      <AvatarFallback>
        <Text>{initial}</Text>
      </AvatarFallback>
    </Avatar>
  );
};

export default PeopleAvatar;
