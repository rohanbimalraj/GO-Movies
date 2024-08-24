import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/colors";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import ReviewCard from "../components/DetailsScreen/ReviewCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  fetchComments,
  fetchMostWatchedMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
} from "../utils/https";
import MoviePoster from "../components/HomeScreen/MoviePoster";
import { extract } from "../utils/extractor";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorScreen from "../components/ErrorScreen";

const width = Dimensions.get("window").width;

function SeeMoreScreen({ route, navigation }) {
  const { title, id } = route.params;
  const inset = useSafeAreaInsets();
  const [data, setData] = useState([]);
  const currentPage = useRef(1);
  const pageCount = useRef(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({ header: () => <Header title={title} /> });
  }, []);

  useEffect(() => {
    fetchMoreData();
  }, []);

  async function fetchMoreData() {
    if (loading || currentPage.current > pageCount.current) {
      return;
    }
    setLoading(true);
    try {
      let response = null;
      if (title === "Reviews") {
        response = await fetchComments(id, currentPage.current);
      } else if (title === "Trending") {
        response = await fetchTrendingMovies(currentPage.current);
      } else if (title === "Popular") {
        response = await fetchPopularMovies(currentPage.current);
      } else if (title === "Most Watched") {
        response = await fetchMostWatchedMovies(currentPage.current);
      }
      const result =
        title === "Reviews" ? response.data : extract(response.data);
      setData((previousData) => [...previousData, ...result]);
      pageCount.current = response.headers["x-pagination-page-count"];
      currentPage.current = currentPage.current + 1;
      if (error) {
        setError(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function renderFooter() {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={styles.loader} color={Colors.accent600} />;
  }

  function renderItem({ item }) {
    if (title === "Reviews") {
      return (
        <ReviewCard
          author={item.user.username}
          date={item.updated_at}
          review={item.comment}
        />
      );
    } else {
      return (
        <MoviePoster
          ids={item.ids}
          title={item.title}
          width={width / 2.5}
          height={(1.5 * width) / 2.5}
        />
      );
    }
  }

  function getKeyFor(item) {
    if (title === "Reviews") {
      return item.id;
    } else if (item.ids.imdb) {
      return item.ids.imdb;
    } else {
      return item.ids.tmdb;
    }
  }

  if (error) {
    return <ErrorScreen onRetry={fetchMoreData} />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      {data.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <View style={[styles.container, { paddingBottom: inset.bottom }]}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={getKeyFor}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            numColumns={title === "Reviews" ? 1 : 2}
            columnWrapperStyle={title === "Reviews" ? null : styles.listRow}
            style={title !== "Reviews" && styles.listContainer}
          />
        </View>
      )}
    </LinearGradient>
  );
}

export default SeeMoreScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    paddingTop: 10,
    flex: 1,
  },
  loader: {
    padding: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listRow: {
    justifyContent: "space-between",
  },
});
