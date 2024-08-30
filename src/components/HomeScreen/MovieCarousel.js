import { View, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import AppCarousel from '../HomeScreen/AppCarousel';
import DotIndicator from "../HomeScreen/DotIndicator";

const width = Dimensions.get("window").width;

function MovieCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function carouselUpdateHandler(index) {
    setCurrentIndex(index);
  }
  return (
    <View>
      <View style={styles.carouselContainer}>
        <AppCarousel data={movies} onSnapToItem={carouselUpdateHandler} />
      </View>
      <View style={styles.dotContainer}>
        <DotIndicator length={movies.length} currentIndex={currentIndex} />
      </View>
    </View>
  );
}

export default MovieCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: width,
    height: width * 0.6,
    marginBottom: 5,
  },
  dotContainer: {
    marginBottom: 10,
  },
});
