import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import TitleButton from "./TitleButton";
import MoviePoster from "./MoviePoster";

const width = Dimensions.get("window").width;

function HorizontalList({ title, data, isWeekly, disableClick }) {
  function buttonPressHandler() {
    console.log("More Button Pressed");
  }
  return (
    <View style={styles.rootContainer}>
      <TitleButton
        title={title}
        onPress={buttonPressHandler}
        isWeekly={isWeekly}
        disableClick={disableClick}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MoviePoster
              ids={item.ids}
              title={item.title}
              width={width / 3}
              height={(1.5 * width) / 3}
            />
          )}
          keyExtractor={(item) => item.ids.imdb}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default HorizontalList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  listContainer: {
    marginLeft: 10,
  },
});
