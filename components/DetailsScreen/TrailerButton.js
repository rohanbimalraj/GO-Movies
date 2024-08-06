import { View, Text, Pressable, StyleSheet } from "react-native";
import * as Linking from 'expo-linking';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";

function TrailerButton({ url }) {
  function playTrailerHandler() {
    Linking.openURL(url);
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={playTrailerHandler}
    >
      <View style={styles.trailerButton}>
        <View style={styles.trailerContainer}>
          <FontAwesome
            name="youtube-play"
            size={30}
            color={Colors.primary700}
          />
          <Text style={styles.trailer}>Trailer</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default TrailerButton;

const styles = StyleSheet.create({
  trailerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  trailerButton: {
    backgroundColor: Colors.accent500,
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
    margin: 20,
  },
  trailer: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 17,
    color: Colors.primary700,
    paddingLeft: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});
