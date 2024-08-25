import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../../screens/DetailsScreen";
import SeeMoreScreen from "../../screens/SeeMoreScreen";
import Header from "./Header";
import TabBarScreen from "./TabBarScreen";

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab Bar"
        component={TabBarScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ header: () => <Header /> }}
      />
      <Stack.Screen
        name="SeeMore"
        component={SeeMoreScreen}
        options={{ header: () => <Header /> }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
