import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";
import Carousel from "react-native-reanimated-carousel";
import CarouselItem from "./CarouselItem";
import { useEffect, useState } from "react";

function AppCarousel({ data }) {
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={width / 2}
        data={data}
        autoPlay={true}
        scrollAnimationDuration={1000}
        autoPlayInterval={2000}
        renderItem={({ item }) => {
          return (
            <CarouselItem
              id={item.id}
              backDropPath={item.backdrop_path}
              title={item.original_title}
            />
          );
        }}
      />
    </View>
  );
}

export default AppCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
  },
  title: {
    color: Colors.accent600,
  },
});
