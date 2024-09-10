import React from "react";
import CustomFlatlist from "@/components/Friends/CustomFlatlist";
import { useGetAllUsersQuery } from "@/redux";
import { View } from "react-native";
import ViewButton from "@/components/Friends/ViewButton";

const Peoples = () => {
  const { data: allUsers } = useGetAllUsersQuery({
    page: 1,
    take: 10,
    order: "asc",
    search: "",
  });
  return (
    <View className="items-center w-full bg-background pt-5 h-full">
      <ViewButton />

      <CustomFlatlist
        type="allUsers"
        activeTab={"allUsers"}
        data={allUsers?.data!}
      />
    </View>
  );
};

export default Peoples;
