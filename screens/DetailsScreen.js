import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ImageHeader from "../components/DetailsScreen/ImageHeader";
import { formatDate } from "../utils/date-formatter";
import { useState } from "react";
import Reviews from "../components/DetailsScreen/Reviews";
import Animated, { Easing, Layout } from "react-native-reanimated";
import MoreDetails from "../components/DetailsScreen/MoreDetails";
import { useRoute } from "@react-navigation/native";
import LoadingIndicator from "../components/LoadingIndicator";
import { fetchMovieCredits, fetchMovieDetails, fetchMovieReviews } from "../utils/https";
import { useEffect } from "react";
import ErrorScreen from "../components/ErrorScreen";

const width = Dimensions.get("window").width;

function ContenView({ movieDeatils }) {
  const {details, reviews, credits} = movieDeatils
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "reviews", title: "Reviews" },
    { key: "moreDetails", title: "More Details" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.accent600, height: 2 }}
      style={{ backgroundColor: "#00000000", shadowOpacity: 0, elevation: 0 }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[styles.tabBarLabel, focused === false && { opacity: 0.7 }]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ImageHeader
        title={details.title}
        backdropPath={details.backdrop_path}
      />
      <Animated.ScrollView>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overview}>{details.overview}</Text>
        <View style={styles.genresContainer}>
          {details.genres.map((genre) => (
            <View key={genre.id} style={styles.genreContainer}>
              <Text style={styles.genre}>{genre.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.ratingAndReleaseContainer}>
          <Text style={styles.rating}>
            TMDB {details.vote_average.toFixed(1)}
          </Text>
          <Text style={styles.date}>
            {formatDate(details.release_date)}
          </Text>
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={() => null}
          onIndexChange={setIndex}
          initialLayout={{ width: width }}
          swipeEnabled={false}
        />
        {index === 0 && <Reviews reviews={reviews.results} />}
        {index === 1 && <Reviews reviews={reviews.results} />}
        {/* {index === 1 && <MoreDetails cast={credits} />} */}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function DetailsScreen() {
  const route = useRoute();
  const { id } = route.params;
  console.log('Movie Id', id)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null)

  async function fetchData() {
    try {
      const [response1, response2, response3, response4] = await Promise.all([
        fetchMovieDetails(id),
        fetchMovieReviews(id),
        fetchMovieCredits(id)
      ]);

      setMovieDetails({
        details: response1.data,
        reviews: response2.data,
        credits: response3.data
      })
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

  if (error) {
    return <ErrorScreen onRetry={fetchData}/>
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      {loading ? <LoadingIndicator /> : <ContenView movieDeatils={movieDetails}/>}
    </LinearGradient>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backButtonContainer: {
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 24,
    color: Colors.accent500,
  },
  overview: {
    fontFamily: AppFonts.SG_Regular,
    color: Colors.accent500,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  overviewTitle: {
    paddingHorizontal: 20,
    paddingTop: 10,
    fontFamily: AppFonts.SG_Bold,
    color: Colors.accent500,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  genresContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    flexWrap: 'wrap',
  },
  genre: {
    color: Colors.primary700,
    fontFamily: AppFonts.SG_SemiBold,
    fontSize: 14,
  },
  genreContainer: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    backgroundColor: Colors.primary500,
    marginHorizontal: 5,
    marginVertical: 5
  },
  ratingAndReleaseContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    opacity: 0.7,
  },
  rating: {
    color: Colors.accent500,
    fontFamily: AppFonts.SG_Bold,
    fontSize: 14,
    marginRight: 20,
  },
  date: {
    color: Colors.accent500,
    fontFamily: AppFonts.SG_Bold,
    fontSize: 14,
  },
  tabBarLabel: {
    color: Colors.accent500,
    fontSize: 14,
    fontFamily: AppFonts.SG_Bold,
  },
});
