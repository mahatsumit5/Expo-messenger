import React from "react";
import CustomFlatlist from "@/components/Friends/CustomFlatlist";
import { useGetAllUsersQuery } from "@/redux";
import { View } from "react-native";
import ViewButton from "@/components/Friends/ViewButton";
import { useAppSelector } from "@/hooks/hooks";

export const takeNumberOfPeopleToDisplay = 5;
const Peoples = () => {
  const { searchQuery, pageForAllUsers } = useAppSelector(
    (store) => store.query
  );
  const { data: allUsers } = useGetAllUsersQuery({
    page: pageForAllUsers,
    take: takeNumberOfPeopleToDisplay,
    order: "asc",
    search: searchQuery,
  });
  console.log("numberof users", allUsers?.totalUsers);
  return (
    <View className="items-center w-full bg-background pt-5 h-full">
      <ViewButton />

      <CustomFlatlist
        type="allUsers"
        activeTab={"allUsers"}
        data={allUsers?.data!}
        totalNumberOfUsers={allUsers?.totalUsers ?? 0}
      />
    </View>
  );
};

export default Peoples;
