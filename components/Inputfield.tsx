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
  inputHeight?: string;
};
const Inputfield: FC<props> = ({
  placeholder,
  value,
  title,
  keyboardType,
  onChange,
  otherFields,
  inputHeight = "h-12",
}) => {
  return (
    <View
      className={`space-y-4 w-28 mt-8 ${otherFields} ${
        title === "First Name" || title === "Last Name" ? "w-1/2" : "w-full"
      }  `}
    >
      <Text className="text-lg font-pmedium">{title}</Text>

      <View
        className={`w-full ${inputHeight}  bg-input  focus:border-primary focus:border rounded-2xl  items-center flex-row focus:shadow-lg focus:shadow-shadow`}
      >
        <TextInput
          className="  h-full w-full p-2"
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
