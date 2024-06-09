import { View, StyleSheet, FlatList, Text } from "react-native";
import TitleButton from "./TitleButton";
import MoviePoster from "./MoviePoster";

function HorizontalList({ title, data }) {
  function buttonPressHandler() {
    console.log("More Button Pressed");
  }
  return (
    <View style={styles.rootContainer}>
      <TitleButton title={title} onPress={buttonPressHandler} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} posterPath={item.poster_path} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
