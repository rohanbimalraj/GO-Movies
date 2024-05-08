import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import Colors from "./constants/colors";
import AppFonts from "./constants/app-fonts";

export default function App() {
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return <View></View>;
  }else {
    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.accent500, fontFamily: AppFonts.SG_Bold, fontSize: 24 }}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary700,
    alignItems: "center",
    justifyContent: "center",
  },
});
