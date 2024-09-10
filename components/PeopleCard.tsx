import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { FC } from "react";
import PeopleAvatar from "./PeopleAvatar";
import Icons from "@/constants/Icons";
import * as Animatable from "react-native-animatable";
import { router } from "expo-router";
import SmallIconButton from "./SmallconButton";
import {
  useAcceptFriendReqMutation,
  useDeleteSentRequestMutation,
  useSendFriendRequestMutation,
} from "@/redux";

import { useAppSelector } from "@/hooks/hooks";
import { Muted, P, Small } from "./ui/typography";

import { MessageCircleIcon, Trash2, UserPlus } from "@/lib/icons/index";
import { Button } from "./ui/button";
import LucidIcon from "./icon/LucidIcon";
import { keys } from "./Friends/CustomFlatlist";

const PeopleCard: FC<{ user: IUser; isInView: boolean; type: keys }> = ({
  user,
  isInView,
  type,
}) => {
  const { view } = useAppSelector((store) => store.view);
  const dynamicButton: Record<keys, React.ReactNode> = {
    allUsers: <NewUser user={user} />,
    Friends: <Friend />,
    "Sent Request": <SentReq receiver={user} />,
    Request: <FriendRequest sender={user} />,
  };
  return view === "card" ? (
    <Animatable.View
      className={` p-2 w-full rounded-md items-center justify-start flex py-8 bg-card`}
      animation={
        isInView
          ? {
              easing: "linear",
              from: { transform: [{ scale: 0.8 }] },
              to: { transform: [{ scale: 1 }] },
            }
          : {
              easing: "linear",
              from: { transform: [{ scale: 1 }] },
              to: { transform: [{ scale: 0.8 }] },
            }
      }
      duration={200}
    >
      <PeopleAvatar
        initial="SM"
        profilePicture={user.profile ?? ""}
        size="h-36 w-36"
      />
      <Text className="mt-3 text-lg font-pmedium uppercase text-card-foreground">
        {user.fName} {user.lName}
      </Text>
      <Muted className="mt-2 text-lg">{user.email}</Muted>
      <View className="flex flex-row">
        <View className="flex flex-row mt-2">
          <Small>200</Small>
          <Small> followers</Small>
        </View>
        <View className="flex flex-row mt-2 ml-4">
          <Small>50</Small>
          <Small> posts</Small>
        </View>
      </View>
      <View className="mt-2 ">
        <Muted className="text-sm font-plight  text-center">
          Add your social media bio here to let people know what you do.
        </Muted>
      </View>
      {dynamicButton[type]}
    </Animatable.View>
  ) : (
    <View className="bg-card flex-row justify-between items-center w-full p-2 rounded-lg">
      <View>
        <View className="flex-row  items-center">
          <PeopleAvatar
            initial="SM"
            profilePicture={user.profile ?? ""}
            size="h-20 w-20"
          />
          <Small className="uppercase text-card-foreground ml-2 mt-1 h-">
            {user.fName} {user.lName}
          </Small>
        </View>

        <Muted className="text-lg">{user.email}</Muted>
      </View>
      <View>{dynamicButton[type]}</View>
    </View>
  );
};

const NewUser: FC<{ user: IUser }> = ({ user }) => {
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation();
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
    <View className="w-full items-center">
      <Button
        onPress={handleAddFriend}
        className="flex flex-row gap-2"
        variant={"default"}
        disabled={isLoading}
      >
        <LucidIcon
          icon={UserPlus}
          onPress={handleAddFriend}
          className="text-primary-foreground"
        />
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            size="small"
            className="ml-2 text-primary-foreground"
          />
        )}
        <P className="text-primary-foreground font-pbold">Add</P>
      </Button>
    </View>
  );
};
const Friend = () => {
  function handleSendMessage() {
    router.navigate("/message");
  }

  return (
    <View className=" w-full items-center">
      <Button
        onPress={handleSendMessage}
        className="flex flex-row gap-2"
        variant={"default"}
      >
        <LucidIcon
          icon={MessageCircleIcon}
          onPress={handleSendMessage}
          className="text-primary-foreground"
        />
        <P className="text-primary-foreground font-pbold">Message</P>
      </Button>
    </View>
  );
};

const SentReq = ({ receiver }: { receiver: IUser }) => {
  const { user } = useAppSelector((store) => store.user);
  const [deleteRequest, { isLoading }] = useDeleteSentRequestMutation();

  async function handleDeleteRequest() {
    try {
      const { data } = await deleteRequest({
        type: "sent",
        fromId: user?.id!,
        toId: receiver.id,
        receiverId: receiver.id,
      });
      if (data?.status) {
        Alert.alert("Success", data?.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("error", error.message);
      } else {
        throw new Error("Unknown error occured");
      }
    }
  }
  return (
    <View className=" w-full items-center">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onPress={handleDeleteRequest}
        disabled={isLoading}
      >
        <LucidIcon
          icon={Trash2}
          onPress={() => {}}
          className="text-destructive-foreground"
          size={18}
        />
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            size="small"
            className="ml-2 text-primary-foreground"
          />
        )}

        <P className="font-psemibold text-destructive-foreground">Delete</P>
      </Button>
    </View>
  );
};

const FriendRequest = ({ sender }: { sender: IUser }) => {
  const { user } = useAppSelector((store) => store.user);
  const [acceptRequest] = useAcceptFriendReqMutation();
  const [deleteRequest] = useDeleteSentRequestMutation();
  async function handleDeleteRequest() {
    try {
      const { data } = await deleteRequest({
        type: "received",
        fromId: sender.id,
        toId: user?.id!,
        receiverId: user?.id!,
      });
      if (data?.status) {
        Alert.alert("Success", data?.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("error", error.message);
      } else {
        throw new Error("Unknown error occured");
      }
    }
  }
  async function handleAcceptRequest() {
    const { data } = await acceptRequest({ fromId: sender.id });
    if (data) {
      Alert.alert(
        "Success",
        `You are now friend with ${data.friendRequest.from.email}`
      );
    }
  }
  return (
    <View className="mt-8 w-full items-center flex-row px-16 justify-between">
      <SmallIconButton
        icon={Icons.check}
        onPress={handleAcceptRequest}
        title="Accept "
        disabled={false}
        variant="bg-success"
        className=""
      />

      <SmallIconButton
        icon={Icons.deleteIcon}
        onPress={handleDeleteRequest}
        title="Cancel "
        disabled={false}
        variant="bg-destructive"
        className=""
      />
    </View>
  );
};

export default PeopleCard;
