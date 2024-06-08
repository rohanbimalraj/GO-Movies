import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

//DUMMY DATA IMPORTS
import nowPlayingMovies from '../data/now-playing.json'
import AppCarousel from "../components/HomeScreen/AppCarousel";

function HomeScreen() {

  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={[styles.rootContainer, {marginBottom: tabBarHeight + 8}]}>
        <SafeAreaView />
        <View style={styles.carouselContainer}>
          <AppCarousel data={nowPlayingMovies.results}/>
        </View>
        <View style={styles.horizontalListContainer}></View>
        <View style={styles.horizontalListContainer}></View>
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  carouselContainer: {
    width: width,
    height: width / 2
  },
  horizontalListContainer: {
    flex: 1,
    //backgroundColor: "cyan",
  },
});
