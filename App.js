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
import DetailsScreen from "./src/screens/DetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FavouritesScreen from "./src/screens/FavouritesScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./src/constants/colors";
import AppFonts from "./src/constants/app-fonts";
import { useEffect, useState } from "react";
import {
  fetchMostWatchedMovies,
  fetchPopularMovies,
  fetchTopGrossingMovies,
  fetchTrendingMovies,
} from "./src/utils/https";
import ErrorScreen from "./src/components/ErrorScreen";
import { useRoute } from "@react-navigation/native";
import { extract } from "./src/utils/extractor";
import SeeMoreScreen from "./src/screens/SeeMoreScreen";
import Header from "./src/components/Header";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function TabBarScreen() {
  const route = useRoute();
  const movies =route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.primary700,
          borderTopWidth: 0,
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
        initialParams={movies}
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
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [topGrossingMovies, setTopGrossingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [mostWatchedMovies, setMostWatchedMovies] = useState([]);

  async function fetchData() {
    try {
      const [response1, response2, response3, response4, response5] = await Promise.all([
        fetchPopularMovies(1, 20),
        fetchTopGrossingMovies(),
        fetchTrendingMovies(),
        fetchPopularMovies(2),
        fetchMostWatchedMovies(),
      ]);

      setSuggestedMovies(extract(response1.data))
      setTopGrossingMovies(extract(response2.data))
      setTrendingMovies(extract(response3.data));
      setPopularMovies(extract(response4.data));
      setMostWatchedMovies(extract(response5.data))

      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
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
        <Stack.Navigator>
          <Stack.Screen
            name="Tab Bar"
            component={TabBarScreen}
            options={{header: () => null}}
            initialParams={{
              suggestedMovies: suggestedMovies,
              topGrossingMovies: topGrossingMovies,
              trendingMovies: trendingMovies,
              popularMovies: popularMovies,
              mostWatchedMovies: mostWatchedMovies,
            }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} options={{header: () => <Header />}}/>
          <Stack.Screen name="SeeMore" component={SeeMoreScreen} options={{header: () => <Header />}}/>
        </Stack.Navigator>
      </NavigationContainer>
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
