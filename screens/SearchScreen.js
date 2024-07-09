import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../components/SearchScreen/SearchBar";

function SearchScreen() {
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
    <SafeAreaView style={styles.rootContainer}>
    <View style={styles.rootContainer}>
        <SearchBar />
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 24,
    color: Colors.accent500,
  },
});
