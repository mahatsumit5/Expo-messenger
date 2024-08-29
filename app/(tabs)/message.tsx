import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Test from "@/components/Test";

const Message = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-9xl">Message</Text>
      </View>
      <Test />
    </SafeAreaView>
  );
};

export default Message;
