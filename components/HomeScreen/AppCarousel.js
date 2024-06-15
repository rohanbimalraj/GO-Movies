import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";
import Carousel from "react-native-reanimated-carousel";
import CarouselItem from "./CarouselItem";

const width = Dimensions.get("window").width;

function AppCarousel({ data, onSnapToItem }) {

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={width*0.6}
        data={data}
        autoPlay={true}
        scrollAnimationDuration={1000}
        autoPlayInterval={2000}
        onSnapToItem={onSnapToItem}
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
  }
});
