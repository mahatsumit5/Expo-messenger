import { View, Text, KeyboardTypeOptions } from "react-native";
import React, { FC } from "react";
import { Input } from "./ui/input";
type props = {
  value: string;
  placeholder: string;
  title: string;
  keyboardType: KeyboardTypeOptions;
  onChange: (text: string) => void;
  inputHeight?: string;
};
const Inputfield: FC<props> = ({
  placeholder,
  value,
  title,
  keyboardType,
  onChange,
  inputHeight = "h-12",
}) => {
  return (
    <View className={`space-y-4 w-full  mt-2    `}>
      <Text className="text-lg font-pmedium text-foreground">{title}</Text>

      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        className="bg-input placeholder:text-input-placeholder mt-5 rounded-xl"
        keyboardAppearance="dark"
        keyboardType={keyboardType}
        placeholderTextColor={"gray"}
        spellCheck
      />
    </View>
  );
};

export default Inputfield;
