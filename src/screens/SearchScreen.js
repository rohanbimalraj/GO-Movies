import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../components/SearchScreen/SearchBar";
import { fetchMoviesWithTitle } from "../utils/https";
import React, { useState, useRef } from "react";
import { extract } from "../utils/extractor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MoviePoster from "../components/HomeScreen/MoviePoster";
import LoadingIndicator from "../components/LoadingIndicator";
import PlaceholderImage from "../components/PlaceholderImage";
import ErrorScreen from "../components/ErrorScreen";

const width = Dimensions.get("window").width;

function SearchScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const inset = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const currentPage = useRef(1);
  const totalPages = useRef(1);
  const currentTitle = useRef("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  function onTextChangeHandler(title) {
    setMovies([]);
    currentTitle.current = title;
    currentPage.current = 1;
    totalPages.current = 1;
    setError(null)
    if (title.length > 0) {
      fetchMovies();
    }
  }

  async function fetchMovies() {
    if (loading || isFetchingMore) {
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await fetchMoviesWithTitle(
        currentTitle.current,
        currentPage.current
      );
      totalPages.current = response.headers["x-pagination-page-count"];
      const newValue = extract(response.data);
      if (currentPage.current === 1) {
        setMovies(newValue);
      } else {
        setMovies((previousValue) => [...previousValue, ...newValue]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }

  function onClearHandler() {
    setError(null)
    setMovies([]);
    currentTitle.current = "";
    currentPage.current = 1;
    totalPages.current = 1;
  }

  function onEndReachedHandler() {
    if (currentPage.current < totalPages.current && !isFetchingMore) {
      setIsFetchingMore(true);
      currentPage.current = currentPage.current + 1;
      fetchMovies();
    }
  }

  function renderFooter() {
    if (isFetchingMore) {
      return (
        <ActivityIndicator style={styles.loader} color={Colors.accent600} />
      );
    }
    return null;
  }

  function getKeyFor(item) {
    if (item.ids.imdb) {
      return item.ids.imdb;
    } else {
      return item.ids.tmdb;
    }
  }

  function renderMainContent() {
    if (error) {
      return <ErrorScreen onRetry={fetchMovies} enableBackground={false}/>;
    } else if (loading === false && movies.length === 0) {
      return (
        <PlaceholderImage
          source={require("../../assets/placeholders/placeholder-search.png")}
        />
      );
    } else if (loading && currentPage.current === 1) {
      return <LoadingIndicator />;
    } else {
      return (
        <FlatList
          data={movies}
          keyExtractor={(movie) => getKeyFor(movie)}
          renderItem={({ item }) => (
            <MoviePoster
              ids={item.ids}
              title={item.title}
              width={width / 2.5}
              height={(1.5 * width) / 2.5}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={styles.container}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      );
    }
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View
        style={[
          styles.rootContainer,
          { paddingTop: inset.top, paddingBottom: tabBarHeight + 8 },
        ]}
      >
        <SearchBar
          onEndEditing={onTextChangeHandler}
          onClear={onClearHandler}
        />
        {renderMainContent()}
      </View>
    </LinearGradient>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 24,
    color: Colors.accent500,
  },
  row: {
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 20,
  }
});
