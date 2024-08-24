import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";

function SeeAllButton({ onPress }) {
  return (
    <View style={styles.seeAllContainer}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <Text style={styles.seeAll}>See all</Text>
      </Pressable>
    </View>
  );
}

export default SeeAllButton;

const styles = StyleSheet.create({
  seeAllContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  seeAll: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 15,
    color: Colors.accent500,
  },
  pressed: {
    opacity: 0.5,
  },
});
