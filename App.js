import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { useEffect, useState } from "react";
import ErrorScreen from "./src/components/ErrorScreen";
import { Provider } from "react-redux";
import store from "./src/redux/configureStore";
import { fetchHomeScreenMovies } from "./src/redux/homeSlice";
import RootNavigation from "./src/components/Navigation/RootNavigation";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [error, setError] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      await Font.loadAsync({
        SpaceGrotesk_300Light,
        SpaceGrotesk_400Regular,
        SpaceGrotesk_500Medium,
        SpaceGrotesk_600SemiBold,
        SpaceGrotesk_700Bold,
      });
      store.dispatch(fetchHomeScreenMovies());
      setFontsLoaded(true);
    };
    loadAssets();
  }, []);

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  }

  if (error) {
    return <ErrorScreen onRetry={fetchData} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}

// To Remove npm packages
// 1) npm unlink <Module Name>
// 2) npm uninstall --save <Module name

// Update Packages
// 1) expo-doctor@latest
// 2) npx expo install --check

// Run app without server on device
// 1) "developmentClient": false
// 2) eas build --profile development --platform ios --local
