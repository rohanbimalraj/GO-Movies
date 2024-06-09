import { View, Image, StyleSheet, Pressable, Dimensions } from "react-native";

const BASE_URL = "https://image.tmdb.org/t/p/w342";

function MoviePoster({ id, posterPath }) {
  return (
    <View style={styles.rootContainer}>
      <Image
        source={{ uri: BASE_URL + posterPath }}
        style={styles.image}
      />
    </View>
  );
}

export default MoviePoster;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    width: width / 3,
    margin: 6,
  },
  image: {
    width: width / 3,
    height: 1.5 * width/3,
    borderRadius: 10,
  },
});
