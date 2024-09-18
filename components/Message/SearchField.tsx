import { View } from "react-native";
import React, { useState } from "react";

import LucidIcon from "../icon/LucidIcon";
import { Search } from "@/lib/icons/Search";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/hooks/hooks";
import { setQuery } from "@/redux/reducers/querySlice";
const SearchField = () => {
  const dispatch = useAppDispatch();
  const [queryString, setQueryString] = useState("");
  return (
    <View className="h-20 py-4  relative ">
      <Input
        className="bg-input h-12 rounded-xl "
        placeholder="Search..."
        onChangeText={(e) => {
          setQueryString(e);

          setTimeout(() => {
            dispatch(setQuery(e.toLowerCase()));
          }, 1000);
        }}
        value={queryString}
      />
      <View className="absolute right-4 top-9 -translate-y-1/2">
        <LucidIcon
          icon={Search}
          onPress={() => {
            dispatch(setQuery(queryString.toLowerCase()));
          }}
          className="text-primary"
        />
      </View>
    </View>
  );
};

export default SearchField;
