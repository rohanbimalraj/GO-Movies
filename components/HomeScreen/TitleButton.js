import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";

function TitleButton({ title, onPress }) {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={28}
          color={Colors.accent500}
        />
      </View>
    </Pressable>
  );
}

export default TitleButton;

const styles = StyleSheet.create({
  titleContainer: {
    //backgroundColor: 'blue',
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  titleText: {
    color: Colors.accent500,
    fontFamily: AppFonts.SG_Bold,
    fontSize: 20,
  },
  pressed: {
    opacity: 0.5
  }
});
