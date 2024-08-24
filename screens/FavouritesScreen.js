import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { fetchFavouriteMovies } from "../utils/favourites";
import MoviePoster from "../components/HomeScreen/MoviePoster";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const width = Dimensions.get("window").width;

function renderItem({ item }) {
  return (
    <MoviePoster
      ids={item.ids}
      title={item.title}
      width={width / 2.5}
      height={(1.5 * width) / 2.5}
    />
  );
}

function getKeysFor(item) {
  if (item.ids.imdb) {
    return item.ids.imdb;
  } else {
    item.ids.tmdb;
  }
}

function FavouritesScreen() {
  const [data, setData] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const inset = useSafeAreaInsets();

  async function fetchData() {
    const movies = await fetchFavouriteMovies();
    setData(movies);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={styles.rootContainer}>
        <SafeAreaView style={styles.rootContainer}>
          <View
            style={[styles.listContainer, { paddingBottom: tabBarHeight + 8 }]}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={getKeysFor}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 24,
    color: Colors.accent500,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
