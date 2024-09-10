import React from "react";
import CustomFlatlist from "@/components/Friends/CustomFlatlist";
import { useGetAllUsersQuery } from "@/redux";
import { View } from "react-native";
import ViewButton from "@/components/Friends/ViewButton";
import { useAppSelector } from "@/hooks/hooks";

const Peoples = () => {
  const { searchQuery, pageForAllUsers, takeNumberOfPeopleToDisplay, order } =
    useAppSelector((store) => store.query);
  const {
    data: allUsers,
    refetch,
    isLoading,
  } = useGetAllUsersQuery(
    {
      page: pageForAllUsers,
      take: takeNumberOfPeopleToDisplay,
      order: order,
      search: searchQuery,
    },
    { refetchOnMountOrArgChange: true }
  );
  return (
    <View className="items-center w-full bg-background pt-5 h-full">
      <ViewButton />

      <CustomFlatlist
        type="allUsers"
        activeTab={"allUsers"}
        data={allUsers?.data!}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

export default Peoples;
