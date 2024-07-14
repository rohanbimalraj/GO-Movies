import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./constants/colors";
import AppFonts from "./constants/app-fonts";
import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "./utils/https";
import ErrorScreen from "./components/ErrorScreen";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function TabBarScreen() {
  const route = useRoute();
  const { nowPlayingMovies } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.primary700,
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 10,
          position: "absolute",
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontFamily: AppFonts.SG_Regular,
        },
        tabBarInactiveTintColor: Colors.accent500,
        tabBarActiveTintColor: Colors.accent600,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{nowPlayingMovies: nowPlayingMovies}}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])

  async function fetchData() {
    const result = await fetchNowPlayingMovies();
    if (result.error) {
      setError(result.error);
    } else {
      if (error) {
        setError(null)
      }
      setNowPlayingMovies(result.data.results)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded || loading) {
    return <View></View>;
  } else {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }

  if (error) {
    return <ErrorScreen onRetry={fetchData} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tab Bar" component={TabBarScreen} initialParams={{nowPlayingMovies: nowPlayingMovies}}/>
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

//To Remove npm packages
//1) npm unlink <Module Name>

//2) npm uninstall --save <Module name
