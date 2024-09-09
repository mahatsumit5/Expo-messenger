import React from "react";
import CustomFlatlist from "@/components/CustomFlatlist";
import { useGetAllUsersQuery } from "@/redux";
import { View } from "react-native";

const Peoples = () => {
  const { data: allUsers } = useGetAllUsersQuery({
    page: 1,
    take: 10,
    order: "asc",
    search: "",
  });
  return (
    <View className="items-center w-full bg-background">
      <CustomFlatlist
        type="allUsers"
        activeTab={"allUsers"}
        data={allUsers?.data!}
      />
    </View>
  );
};

export default Peoples;
