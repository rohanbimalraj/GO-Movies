import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import AppCarousel from "../components/HomeScreen/AppCarousel";
import DotIndicator from "../components/HomeScreen/DotIndicator";
import HorizontalList from "../components/HomeScreen/HorizontalList";

//DUMMY DATA IMPORTS
import nowPlayingMovies from "../data/now-playing.json";
import topRatedMovies from "../data/top-rated.json";
import popularMovies from "../data/popular.json";
import upcomingMovies from "../data/upcoming.json";

function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [currentIndex, setCurrentIndex] = useState(0);

  function carouselUpdateHandler(index) {
    setCurrentIndex(index);
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={[styles.rootContainer, { marginBottom: tabBarHeight + 8 }]}>
        <SafeAreaView />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.carouselContainer}>
            <AppCarousel
              data={nowPlayingMovies.results}
              onSnapToItem={carouselUpdateHandler}
            />
          </View>
          <DotIndicator
            length={nowPlayingMovies.results.length}
            currentIndex={currentIndex}
          />
          <HorizontalList title="Popular" data={popularMovies.results} />
          <HorizontalList title="Top Rated" data={topRatedMovies.results} />
          <HorizontalList title="Upcoming" data={upcomingMovies.results} />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  carouselContainer: {
    width: width,
    height: width*0.6,
  },
});
