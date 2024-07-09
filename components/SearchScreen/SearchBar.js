import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { FontAwesome } from '@expo/vector-icons';

function SearchBar() {
  const [text, onChangeText] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
      <View style={styles.searchIcon}>
      <FontAwesome name="search" size={24} color={Colors.primary700} />
      </View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Search movies..."
          placeholderTextColor={Colors.primary700}
          keyboardType='web-search'
        />
      </View>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.primary500,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 5,
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  searchIcon: {
    paddingHorizontal: 10
  }
});
