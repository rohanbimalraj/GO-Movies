import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import TitleButton from "./TitleButton";
import MoviePoster from "./MoviePoster";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;

function HorizontalList({ title, data, isWeekly, disableClick }) {
  const navigation = useNavigation();
  
  function buttonPressHandler() {
    navigation.navigate({
      key: `UniqueKey-${Math.random()}`,
      name: "SeeMore",
      params: { title: title },
    });
  }

  function renderItem({ item }) {
    return (
      <MoviePoster
        ids={item.ids}
        title={item.title}
        width={width / 3}
        height={(1.5 * width) / 3}
      />
    );
  }

  function getKeysFor(item) {
    if (item.ids.imdb) {
      return item.ids.imdb
    } else {
      item.ids.tmdb
    }
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
          renderItem={renderItem}
          keyExtractor={getKeysFor}
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
