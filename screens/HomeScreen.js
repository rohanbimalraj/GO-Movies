import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HorizontalList from "../components/HomeScreen/HorizontalList";
import { useRoute } from "@react-navigation/native";
import MovieCarousel from "../components/HomeScreen/MovieCarousel";

function HomeScreen() {
  const route = useRoute();
  const movies = route.params;
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={[styles.rootContainer, { marginBottom: tabBarHeight + 8 }]}>
        <SafeAreaView />
        <ScrollView showsVerticalScrollIndicator={false}>
          <MovieCarousel movies={movies.suggestedMovies}/>
          <HorizontalList
            title="Top Grossing"
            data={movies.topGrossingMovies}
            isWeekly={true}
            disableClick={true}
          />
          <HorizontalList
            title="Trending"
            data={movies.trendingMovies}
          />
          <HorizontalList
            title="Popular"
            data={movies.popularMovies}
          />
          <HorizontalList
            title="Most Watched"
            data={movies.mostWatchedMovies}
            isWeekly={true}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  }
});
