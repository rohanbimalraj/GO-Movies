import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

//DUMMY DATA IMPORTS
import nowPlayingMovies from '../data/now-playing.json'

function HomeScreen() {

  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={[styles.rootContainer, {marginBottom: tabBarHeight}]}>
        <SafeAreaView />
        <View style={styles.carouselContainer}>
          <Text>Rohan Bimal Raj</Text>
        </View>
        <View style={styles.horizontalListContainer}></View>
        <View style={styles.horizontalListContainer}></View>
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  horizontalListContainer: {
    flex: 1,
    backgroundColor: "blue",
  },
});
