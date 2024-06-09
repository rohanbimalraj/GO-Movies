import { View, StyleSheet, FlatList, Text } from "react-native";
import { useState } from "react";
import TitleButton from "./TitleButton";
import MoviePoster from "./MoviePoster";

function HorizontalList({ title, data }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }

  function buttonPressHandler() {
    console.log("More Button Pressed");
  }
  return (
    <View style={styles.rootContainer}>
      <TitleButton title={title} onPress={buttonPressHandler} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MoviePoster
            posterPath={item.poster_path}
            height={dimensions.height}
            width={dimensions.width}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onLayout={onLayout}
      />
    </View>
  );
}

export default HorizontalList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    //backgroundColor: 'red'
  },
});
