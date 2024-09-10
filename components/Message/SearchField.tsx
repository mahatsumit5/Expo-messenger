import { View } from "react-native";
import React from "react";

import LucidIcon from "../icon/LucidIcon";
import { Search } from "@/lib/icons/Search";
import { Input } from "../ui/input";
const SearchField = () => {
  return (
    <View className="h-20 py-4  relative ">
      <Input
        className="bg-input h-12 rounded-full border border-input shadow-md shadow-shadow"
        placeholder="Search..."
      />
      <View className="absolute right-4 top-9 -translate-y-1/2">
        <LucidIcon icon={Search} onPress={() => {}} />
      </View>
    </View>
  );
};

export default SearchField;
