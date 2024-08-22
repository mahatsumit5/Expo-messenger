import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Message = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-9xl">Message</Text>
      </View>
    </SafeAreaView>
  );
};

export default Message;
