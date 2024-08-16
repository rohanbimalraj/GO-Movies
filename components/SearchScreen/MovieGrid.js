import { FlatList, StyleSheet, Dimensions } from "react-native";
import MoviePoster from "../HomeScreen/MoviePoster";

function MovieGrid({ movies }) {
  const width = Dimensions.get("window").width;

  return (
    <FlatList
      data={movies}
      keyExtractor={(movie) => movie.ids.imdb}
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
    />
  );
}

export default MovieGrid;

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 20,
  },
});
