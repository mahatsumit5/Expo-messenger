import { View } from "react-native";
import PeopleAvatar from "../PeopleAvatar";
import { extractInitial } from "@/lib/utils";
import { Large, P, Small } from "../ui/typography";
import { Button } from "../ui/button";
import LucidIcon from "../icon/LucidIcon";
import { Heart } from "@/lib/icons/index";

export const SingleComment = ({ comment }: { comment: IComment }) => {
  return (
    <View className=" p-2 mx-auto  justify-between    gap-4  px-4">
      <View className="justify-between items-start w-full flex-row">
        <View className="flex-row gap-4   justify-center ">
          <PeopleAvatar
            profilePicture={comment.author.profile!}
            initial={extractInitial(comment.author.fName, comment.author.lName)}
            size="w-14 h-14"
          />
          <View>
            <Large className=" ">
              {comment.author.fName} {comment.author.lName}
            </Large>
            <P className="">{comment.content}</P>
            <Button variant={"link"} size={"sm"}>
              <Small className="underline text-left">Reply</Small>
            </Button>
          </View>
        </View>
        <View>
          <LucidIcon icon={Heart} className="text-destructive" />
        </View>
      </View>
    </View>
  );
};
