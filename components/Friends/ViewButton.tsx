import { View } from "react-native";
import React from "react";
import { Button } from "../ui/button";
import LucidIcon from "../icon/LucidIcon";
import { IdCard, Rows3 } from "@/lib/icons/index";
import { useAppDispatch } from "@/hooks/hooks";
import { setView } from "@/redux/reducers/firendView.slice";
import { SelectMenu } from "../Select/Select";
const ViewButton = () => {
  const dispatch = useAppDispatch();

  function handlePress(type: "card" | "row") {
    dispatch(setView(type));
  }
  return (
    <View className=" w-full items-end  flex-row justify-end gap-4">
      <SelectMenu />
      <Button size={"icon"} variant={"outline"}>
        <LucidIcon
          icon={IdCard}
          onPress={() => {
            handlePress("card");
          }}
          className="text-primary"
        />
      </Button>
      <Button size={"icon"} variant={"outline"}>
        <LucidIcon
          icon={Rows3}
          onPress={() => {
            handlePress("row");
          }}
          className="text-primary"
        />
      </Button>
    </View>
  );
};

export default ViewButton;
