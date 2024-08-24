import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";

function TitleButton({ title, onPress, isWeekly, disableClick }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
        disabled={disableClick}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {disableClick === undefined && (
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={Colors.accent500}
            />
          )}
        </View>
      </Pressable>
      {isWeekly && (
        <View
          style={[
            styles.weeklyBadgeContainer,
            disableClick && { marginLeft: 10 },
          ]}
        >
          <Text style={styles.weeklyBadge}>weekly</Text>
        </View>
      )}
    </View>
  );
}

export default TitleButton;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 10,
  },
  titleText: {
    color: Colors.accent500,
    fontFamily: AppFonts.SG_Bold,
    fontSize: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  weeklyBadge: {
    fontFamily: AppFonts.SG_SemiBold,
    fontSize: 12,
    color: Colors.accent500,
    opacity: 0.5,
  },
  weeklyBadgeContainer: {
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "rgba(254, 253, 255, 0.5)",
    borderRadius: 5,
    padding: 3,
  },
});
