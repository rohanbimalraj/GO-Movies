import { View, Image, StyleSheet, Pressable, Dimensions } from "react-native";

const BASE_URL = "https://image.tmdb.org/t/p/w342";

function MoviePoster({ id, posterPath, height, width }) {
  return (
    <View style={styles.rootContainer}>
      <Image
        source={{ uri: BASE_URL + posterPath }}
        style={[styles.image, { height: 1.5 * width/3, width: width/3 }]}
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
    //backgroundColor: "red",
  },
  image: {
    width: width / 3,
    borderRadius: 10,
  },
});
