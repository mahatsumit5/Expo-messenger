import { View } from "react-native";
import { Button } from "../ui/button";
import { SendHorizonal } from "@/lib/icons/Send";
import LoadingState from "../button/LoadingState";
import { FC, useState } from "react";
import { Input } from "../ui/input";
import { usePostCommentMutation } from "@/redux";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/hooks/hooks";
import PeopleAvatar from "../PeopleAvatar";
import { ErrorAlert } from "@/lib/utils";

interface props {
  postCreatorId: string;
}
const InputField: FC<props> = ({ postCreatorId }) => {
  const SendIcon = SendHorizonal;
  const { comment } = useLocalSearchParams();

  const { user } = useAppSelector((state) => state.user);
  const { socket } = useAppSelector((state) => state.socket);

  const [postComment, { isLoading }] = usePostCommentMutation();

  const [commentInput, setCommentInput] = useState<string>("");
  async function onPress() {
    try {
      const { data } = await postComment({
        postId: comment as string,
        content: commentInput,
        userId: user?.id!,
      });
      if (data && socket) {
        socket.emit("newComment", { ...data, to: postCreatorId });
      }
    } catch (error) {
      ErrorAlert(error);
    } finally {
      setCommentInput("");
    }
  }
  return (
    <View className="px-2  pt-5 flex-row gap-2 items-start bg-header h-28">
      <PeopleAvatar
        initial="sm"
        profilePicture={user?.profile ?? ""}
        size="w-12 h-12"
      />
      <Input
        className="flex-1  h-14 rounded-full px-4 bg-card"
        placeholder="Add new comment"
        onChangeText={(e) => setCommentInput(e)}
        value={commentInput}
      />
      <Button
        className="flex  rounded-full flex-row gap-2"
        disabled={isLoading}
        variant={"outline"}
        onPress={onPress}
      >
        {!isLoading ? (
          <SendIcon size={25} className="text-secondary" />
        ) : (
          <LoadingState />
        )}
      </Button>
    </View>
  );
};

export { InputField };
