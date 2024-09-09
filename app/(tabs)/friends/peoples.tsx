import { View, Text } from "react-native";
import React from "react";
import CustomFlatlist from "@/components/CustomFlatlist";
import { useGetAllUsersQuery } from "@/redux";

const peoples = () => {
  const {
    data: allUsers,
    isError,
    isLoading,
  } = useGetAllUsersQuery({
    page: 1,
    take: 10,
    order: "asc",
    search: "",
  });
  return (
    <CustomFlatlist
      type="allUsers"
      activeTab={"allUsers"}
      data={allUsers?.data!}
    />
  );
};

export default peoples;
