import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HorizontalList from "../components/HomeScreen/HorizontalList";
import MovieCarousel from "../components/HomeScreen/MovieCarousel";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHomeScreenMovies,
  homeScreenError,
  homeScreenLoading,
  homeScreenMovies,
} from "../redux/homeSlice";
import ErrorScreen from "../components/ErrorScreen";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();
  const { suggested, topGrossing, trending, popular, mostWatched } =
    useSelector(homeScreenMovies);
  const error = useSelector(homeScreenError);
  const loading = useSelector(homeScreenLoading);

  function retryHandler() {
    dispatch(fetchHomeScreenMovies());
  }

  if (error) {
    return <ErrorScreen onRetry={retryHandler} />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={[styles.rootContainer, { marginBottom: tabBarHeight + 8, marginTop: inset.top }]}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <MovieCarousel movies={suggested} />
            <HorizontalList
              title="Top Grossing"
              data={topGrossing}
              isWeekly={true}
              disableClick={true}
            />
            <HorizontalList title="Trending" data={trending} />
            <HorizontalList title="Popular" data={popular} />
            <HorizontalList
              title="Most Watched"
              data={mostWatched}
              isWeekly={true}
            />
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
