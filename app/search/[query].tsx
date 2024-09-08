import { View, Text, TextInput } from "react-native";
import React from "react";
import TouchableIcon from "@/components/TouchableIcon";
import Icons from "@/constants/Icons";
import SearchField from "@/components/Message/SearchField";

const Search = () => {
  return (
    <View className="p-4">
      <SearchField />
    </View>
  );
};

export default Search;
