import { View, StyleSheet, SafeAreaView } from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../components/SearchScreen/SearchBar";
import { fetchMoviesWithTitle } from "../utils/https";
import { useState } from "react";
import MovieGrid from "../components/SearchScreen/MovieGrid";
import { extract } from "../utils/extractor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function SearchScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const inset = useSafeAreaInsets();
  const [movies, setMovies] = useState([])

  async function fetchMovies(title) {
    try {
      const response = await fetchMoviesWithTitle(title)
      setMovies(extract(response.data))
      console.log('Movies', response.data)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('Loading finised')
    }
  }

  function onClearHandler() {
    setMovies([])
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
          <View style={[styles.rootContainer, {paddingTop: inset.top, paddingBottom: tabBarHeight + 8}]}>
        <SearchBar onEndEditing={fetchMovies} onClear={onClearHandler}/>
        <MovieGrid movies={movies}/>
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
});
