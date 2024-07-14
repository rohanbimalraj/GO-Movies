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
import { useState, useContext } from "react";
import AppCarousel from "../components/HomeScreen/AppCarousel";
import DotIndicator from "../components/HomeScreen/DotIndicator";
import HorizontalList from "../components/HomeScreen/HorizontalList";
import { useRoute } from "@react-navigation/native";

function HomeScreen() {
  const route = useRoute();
  const movies = route.params;
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
              data={movies.nowPlayingMovies}
              onSnapToItem={carouselUpdateHandler}
            />
          </View>
          <DotIndicator
            length={movies.nowPlayingMovies.length}
            currentIndex={currentIndex}
          />
          <HorizontalList
            title="Popular"
            data={movies.popularMovies}
          />
          <HorizontalList
            title="Top Rated"
            data={movies.topRatedMovies}
          />
          <HorizontalList
            title="Upcoming"
            data={movies.upcomingMovies}
          />
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
    height: width * 0.6,
  },
});
