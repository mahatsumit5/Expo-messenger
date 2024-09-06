import { store } from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  async function authenticate() {
    const { success } = await LocalAuthentication.authenticateAsync({
      biometricsSecurityLevel: "strong",
      requireConfirmation: true,
      cancelLabel: "exit",
      fallbackLabel: "",
      promptMessage: "Enter your password to enter",
    });
    setAuthenticated(success);
  }

  useEffect(() => {
    if (loaded) {
      authenticate();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return loaded && authenticated ? (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen
            name="search/[query]"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  ) : null;
}
