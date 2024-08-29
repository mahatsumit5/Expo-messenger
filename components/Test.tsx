import React from "react";
import { Text, Animated, StyleSheet, View } from "react-native";

import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

function LegacyLeftAction(prog: any, drag: any) {
  prog.addListener((value: any) => {
    console.log("[L] showLeftProgress:", value.value);
  });
  drag.addListener((value: any) => {
    console.log("[L] appliedTranslation:", value.value);
  });

  const trans = Animated.subtract(drag, 50);

  return (
    <Animated.Text
      style={[
        styles.leftAction,
        {
          transform: [{ translateX: trans }],
        },
      ]}
    >
      left
    </Animated.Text>
  );
}

function LegacyRightAction(prog: any, drag: any) {
  prog.addListener((value: any) => {
    console.log("[L] showRightProgress:", value.value);
  });
  drag.addListener((value: any) => {
    console.log("[L] appliedTranslation:", value.value);
  });

  const trans = Animated.add(drag, 50);

  return (
    <Animated.Text
      style={[
        styles.rightAction,
        {
          transform: [{ translateX: trans }],
        },
      ]}
    >
      Text
    </Animated.Text>
  );
}

export default function Example() {
  return (
    <GestureHandlerRootView>
      <Swipeable
        containerStyle={styles.swipeable}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={LegacyLeftAction}
        renderRightActions={LegacyRightAction}
      >
        <Text className="text-white font-pbold">[Legacy] Swipe me!</Text>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  leftAction: { width: 50, height: 50, backgroundColor: "crimson" },
  rightAction: { width: 50, height: 50, backgroundColor: "purple" },

  swipeable: {
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
  },
});
