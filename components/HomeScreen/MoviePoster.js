import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import Colors from "../../constants/colors";

const BASE_URL = "https://image.tmdb.org/t/p/w342";

function MoviePoster({ id, posterPath }) {
  const [loading, setLoading] = useState(true);

  function onLoad() {
    setLoading(false);
  }
  return (
    <View style={styles.rootContainer}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary600} />
        </View>
      )}
      <Image
        source={{ uri: BASE_URL + posterPath }}
        style={styles.image}
        onLoad={onLoad}
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
    height: (1.5 * width) / 3,
    borderRadius: 10,
  },
  loader: {
    borderRadius: 10,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // semi-transparent white background
  },
});
