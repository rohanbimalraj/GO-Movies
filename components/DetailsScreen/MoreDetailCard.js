import { View, Text, StyleSheet } from "react-native";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";

function MoreDetailCard({ title, elements }) {
  const requiredElements = elements.slice(0, 10);
  const requiredStr = requiredElements.map((obj) => obj.name).join(", ");

  if (typeof requiredStr !== 'string') {
    return <Text>Not a string</Text>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>
      <Text style={styles.content}>{requiredStr}</Text>
      </View>
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
    fontFamily: 15,
    color: Colors.accent500,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.accent500,
    opacity: 0.5,
  },
  contentContainer: {
    paddingVertical: 10,
  }
});
