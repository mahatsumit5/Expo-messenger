import { View, Text, FlatList } from "react-native";
import React from "react";
import PeopleCard from "@/components/PeopleCard";
import { useAppSelector } from "@/hooks/hooks";

const Friends = () => {
  const { user } = useAppSelector((store) => store.user);
  return (
    <View className="h-full p-2 ">
      <View>
        <Text className="font-pmedium text-xl">Your Friends</Text>
        <FlatList
          horizontal
          data={[]}
          renderItem={() => <Text>Friend</Text>}
          ListEmptyComponent={() => <Text>Empty friends</Text>}
        />
      </View>
      <View>
        <Text className="font-pmedium text-xl">Find New friends</Text>

        <PeopleCard user={user!} />
      </View>
    </View>
  );
};

export default Friends;
