import { View, Text, StyleSheet } from "react-native";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";

function MoreDetailCard({ title, elements }) {
  const count = elements.length;
  const requiredElements = elements.slice(0, 10);
  const requiredStr = requiredElements.map((obj) => obj.name).join(", ");

  if (typeof requiredStr !== "string") {
    return <Text>Not a string</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {(count > 10) &&
        (
          <View style={styles.countContainer}>
            <Text style={styles.count}>{count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.content}>{requiredStr}</Text>
      <View style={styles.separator}></View>
    </View>
  );
}

export default MoreDetailCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 17,
    color: Colors.accent500,
  },
  content: {
    fontFamily: AppFonts.SG_Regular,
    fontSize: 14,
    color: Colors.accent500,
    paddingVertical: 10,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.accent500,
    opacity: 0.5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  count: {
    fontFamily: AppFonts.SG_SemiBold,
    color: Colors.primary700,
    fontSize: 10,
    padding: 3,
    backgroundColor: Colors.accent500,
  },
  countContainer: {
    marginLeft: 5,
    borderRadius: 3,
    overflow: "hidden",
    opacity: 0.5,
  },
});
