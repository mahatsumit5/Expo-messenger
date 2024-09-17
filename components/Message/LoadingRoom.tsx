import { ScrollView, View } from "react-native";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingRoom = () => {
  return (
    <ScrollView className="h-full bg-background p-2 ">
      {Array(10)
        .fill("")
        .map((item, index) => (
          <View
            className=" flex-row justify-between items-center mt-3"
            key={index}
          >
            <View className="flex-row gap-2">
              <Skeleton className="h-16 w-16 rounded-full bg-muted" />
              <View className="justify-center gap-2">
                <View className="flex-row gap-2">
                  <Skeleton className="h-4 w-16 bg-muted" />
                  <Skeleton className="h-4 w-16 bg-muted" />
                </View>
                <Skeleton className="h-4 w-36 rounded-full bg-muted" />
              </View>
            </View>
            <View className="flex-row gap-4">
              <Skeleton className="h-8 w-8 rounded-xl bg-muted" />
              <Skeleton className="h-8 w-2 rounded-xl bg-muted" />
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default LoadingRoom;
