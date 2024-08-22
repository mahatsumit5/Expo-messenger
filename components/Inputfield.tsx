import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { FC } from "react";
type props = {
  value: string;
  placeholder: string;
  title: string;
  keyboardType: KeyboardTypeOptions;
  onChange: (text: string) => void;
  otherFields?: string;
};
const Inputfield: FC<props> = ({
  placeholder,
  value,
  title,
  keyboardType,
  onChange,
  otherFields,
}) => {
  return (
    <View
      className={`space-y-4 w-28 mt-8 ${otherFields} ${
        title === "First Name" || title === "Last Name" ? "w-1/2" : "w-full"
      }`}
    >
      <Text className="text-lg font-pmedium">{title}</Text>

      <View
        className={`w-full h-12 px-2 bg-black-100 border border-blue-200 rounded-2xl focus:border-secondary items-center flex-row`}
      >
        <TextInput
          className="  h-full w-full active:shadow-lg"
          placeholder={placeholder}
          placeholderTextColor={"gray"}
          keyboardType={keyboardType}
          onChangeText={onChange}
          value={value}
        />
      </View>
    </View>
  );
};

export default Inputfield;
