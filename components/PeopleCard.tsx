import { View, Text, Alert } from "react-native";
import React, { FC } from "react";
import PeopleAvatar from "./PeopleAvatar";
import TouchableIcon from "./TouchableIcon";
import Icons from "@/constants/Icons";
import * as Animatable from "react-native-animatable";
import { router } from "expo-router";
import SmallIconButton from "./SmallconButton";
import { useSendFriendRequestMutation } from "@/redux";
type Keys = "Friends" | "NewUser" | "Request" | "Sent Request";
const PeopleCard: FC<{ user: IUser; isInView: boolean; type: Keys }> = ({
  user,
  isInView,
  type,
}) => {
  const dynamicButton: Record<Keys, React.ReactNode> = {
    NewUser: <NewUser user={user} />,
    Friends: <Friend />,
    "Sent Request": <></>,
    Request: <></>,
  };
  return (
    <Animatable.View
      className={` p-2 w-full rounded-md items-center justify-start flex py-8 bg-background`}
      animation={
        isInView
          ? {
              easing: "linear",
              from: { transform: [{ scale: 0.8 }] },
              to: { transform: [{ scale: 0.9 }] },
            }
          : {
              easing: "linear",
              from: { transform: [{ scale: 0.9 }] },
              to: { transform: [{ scale: 0.8 }] },
            }
      }
      duration={200}
    >
      <PeopleAvatar initial="SM" profilePicture={user.profile} />
      <Text className="mt-3 text-lg font-pmedium uppercase">
        {user.fName} {user.lName}
      </Text>
      <Text className="mt-1 text-sm font-pregular">{user.email}</Text>
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
          Add your social media bio here to let people know what you do.
        </Text>
      </View>
      {/* to do customise according to your needs */}
      {dynamicButton[type]}
    </Animatable.View>
  );
};

const NewUser: FC<{ user: IUser }> = ({ user }) => {
  const [sendFriendRequest, { isError, isLoading }] =
    useSendFriendRequestMutation();
  async function handleAddFriend() {
    const { data } = await sendFriendRequest({
      to: user.id,
      page: 1,
    });
    if (data) {
      Alert.alert(
        "success",
        `Your request has been sent to ${data.data.to.email}`
      );
    }
  }

  return (
    <View className="mt-4 w-full items-center">
      <SmallIconButton
        icon={Icons.addFriend}
        onPress={handleAddFriend}
        title="Add Friend"
        disabled={isLoading}
      />
    </View>
  );
};
const Friend = () => {
  function handleSendMessage() {
    router.navigate("/(tabs)/message");
  }

  return (
    <View className="mt-4 w-full items-center">
      <SmallIconButton
        icon={Icons.message}
        onPress={handleSendMessage}
        title="Message"
      />
    </View>
  );
};

export default PeopleCard;
