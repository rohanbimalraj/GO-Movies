import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";
import HomeScreen from "../../screens/HomeScreen";
import FavouritesScreen from "../../screens/FavouritesScreen";
import SearchScreen from "../../screens/SearchScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabBarScreen() {
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

export default TabBarScreen;
