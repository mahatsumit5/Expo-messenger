import { Text } from "react-native";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const PeopleAvatar: FC<{
  profilePicture: string;
  initial: string;
  size?: string;
}> = ({ profilePicture, initial }) => {
  return (
    <Avatar alt=" Avatar">
      <AvatarImage source={{ uri: profilePicture }} />
      <AvatarFallback>
        <Text>{initial}</Text>
      </AvatarFallback>
    </Avatar>
  );
};

export default PeopleAvatar;
