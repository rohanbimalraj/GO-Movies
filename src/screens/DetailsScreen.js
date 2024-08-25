import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { TabView, TabBar } from "react-native-tab-view";
import ImageHeader from "../components/DetailsScreen/ImageHeader";
import { formatDate } from "../utils/date-formatter";
import { useState, useRef, useCallback, useEffect } from "react";
import Reviews from "../components/DetailsScreen/Reviews";
import MoreDetails from "../components/DetailsScreen/MoreDetails";
import LoadingIndicator from "../components/LoadingIndicator";
import { fetchComments, fetchMovieSummary, fetchPeople } from "../utils/https";
import ErrorScreen from "../components/ErrorScreen";
import { convertToSingleDecimal } from "../utils/number-formatter";
import { convertMinutesToHoursAndMinutes } from "../utils/minute-hour-converter";
import TrailerButton from "../components/DetailsScreen/TrailerButton";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const width = Dimensions.get("window").width;

function ContenView({ movieDeatils, pageCount, ids }) {
  const { details, reviews, credits } = movieDeatils;
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const [routes] = useState([
    { key: "reviews", title: "Reviews" },
    { key: "moreDetails", title: "More Details" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.accent600, height: 2 }}
      style={{ backgroundColor: "#00000000", shadowOpacity: 0, elevation: 0 }}
      renderLabel={({ route, focused }) => (
        <Text
          style={[styles.tabBarLabel, focused === false && { opacity: 0.7 }]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  function seeAllHandler() {
    navigation.navigate({
      key: `UniqueKey-${Math.random()}`,
      name: "SeeMore",
      params: { title: "Reviews", id: ids.imdb },
    });
  }

  return (
    <ScrollView>
      <ImageHeader title={details.title} ids={ids} />
      <Text style={styles.overviewTitle}>Overview</Text>
      <Text style={styles.overview}>{details.overview}</Text>
      <View style={styles.genresContainer}>
        {details.genres.map((genre) => (
          <View key={genre} style={styles.genreContainer}>
            <Text style={styles.genre}>{genre}</Text>
          </View>
        ))}
      </View>
      <View style={styles.ratingAndReleaseContainer}>
        <Text style={styles.rating}>
          Rating {convertToSingleDecimal(details.rating)}
        </Text>
        <Text style={styles.date}>{formatDate(details.released)}</Text>
        <Text style={styles.runtime}>
          {convertMinutesToHoursAndMinutes(details.runtime)}
        </Text>
      </View>
      <TrailerButton url={details.trailer} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={() => null}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        swipeEnabled={false}
      />
      {index === 0 && (
        <Reviews
          reviews={reviews}
          pageCount={pageCount}
          seeAll={seeAllHandler}
        />
      )}
      {index === 1 && <MoreDetails credits={credits} />}
    </ScrollView>
  );
}

function DetailsScreen({ route }) {
  const { ids } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const inset = useSafeAreaInsets();
  const pageCountRef = useRef(0);

  async function fetchData() {
    try {
      const [response1, response2, response3] = await Promise.all([
        fetchMovieSummary(ids.imdb),
        fetchComments(ids.imdb),
        fetchPeople(ids.imdb),
      ]);

      pageCountRef.current = response2.headers["x-pagination-page-count"];
      setMovieDetails({
        details: response1.data,
        reviews: response2.data,
        credits: response3.data,
      });
      if (error) {
        setError(null);
      }
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
    return <ErrorScreen onRetry={fetchData} />;
  }

  if (ids.imdb === null) {
    return (
      <LinearGradient
        colors={[Colors.primary700, Colors.primary600]}
        style={styles.rootContainer}
      >
        <View style={styles.rootContainer}>
          <Text style={[styles.noInfo, {paddingBottom: inset.top}]}>Oops info not available!!!</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ContenView
          movieDeatils={movieDetails}
          pageCount={pageCountRef.current}
          ids={ids}
        />
      )}
    </LinearGradient>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    flexWrap: "wrap",
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
    marginVertical: 5,
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
  runtime: {
    color: Colors.accent500,
    fontFamily: AppFonts.SG_Bold,
    fontSize: 14,
    marginHorizontal: 20,
  },
  tabBarLabel: {
    color: Colors.accent500,
    fontSize: 14,
    fontFamily: AppFonts.SG_Bold,
  },
  noInfo: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 17, 
    color: Colors.accent500
  }
});
