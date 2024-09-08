import { View, Text, TextInput } from "react-native";
import React from "react";
import TouchableIcon from "../TouchableIcon";
import Icons from "@/constants/Icons";

const SearchField = () => {
  return (
    <View className="bg-gray-300/40 h-10 mt-3 rounded-full px-3 relative">
      <TextInput
        className=" h-full  font-pregular"
        placeholder="Ask AI or Search"
        placeholderTextColor={"gray"}
      />
      <View className="absolute right-2 top-2 -translate-y-1/2">
        <TouchableIcon
          icon={Icons.search}
          onPress={() => {}}
          iconClassName="w-6 h-6 rounded-full"
        />
      </View>
    </View>
  );
};

export default SearchField;
