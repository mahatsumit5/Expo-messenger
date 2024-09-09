import "@/global.css";
import { store } from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { StatusBar } from "expo-status-bar";
import CustomStatusBar from "@/components/CustomStatusBAr";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [authenticated, setAuthenticated] = useState(false);

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
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
    (async () => {
      const theme = await AsyncStorage.getItem("theme");

      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      // const colorTheme = theme === "dark" ? "dark" : "light";
      // if (colorTheme !== colorScheme) {
      //   setColorScheme(colorTheme);
      //   setAndroidNavigationBar(colorTheme);
      //   setIsColorSchemeLoaded(true);
      //   return;
      // }
      // setAndroidNavigationBar(colorTheme);
      // setIsColorSchemeLoaded(true);
    })().finally(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    });
  }, [loaded, colorScheme]);

  return loaded ? (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <CustomStatusBar />
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
    </ThemeProvider>
  ) : null;
}
