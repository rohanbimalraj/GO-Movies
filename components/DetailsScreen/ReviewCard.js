import { View, Text, StyleSheet } from "react-native";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";
import ReadMore from "@fawazahmed/react-native-read-more";
import { formatDate } from "../../utils/date-formatter";

function ReviewCard({ author, date, review }) {
  return (
    <View style={styles.rootContainer}>
      <View>
        <View style={styles.authorConatiner}>
          <Text numberOfLines={1} style={styles.author}>{author}</Text>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
      </View>
      <ReadMore
        style={styles.description}
        numberOfLines={10}
        seeMoreStyle={styles.readMore}
        seeLessStyle={styles.readMore}
      >
        {review}
      </ReadMore>
      <View style={styles.separator}></View>
    </View>
  );
}

export default ReviewCard;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20
  },
  authorConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'baseline'
  },
  author: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 17,
    color: Colors.accent500,
    width: 200
  },
  date: {
    fontFamily: AppFonts.SG_Medium,
    fontSize: 12,
    color: Colors.accent500,
  },
  description: {
    fontFamily: AppFonts.SG_Regular,
    fontSize: 12,
    color: Colors.accent500,
    paddingVertical: 10
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.accent500,
    opacity: 0.5
  },
  readMore: {
    fontFamily: AppFonts.SG_Bold,
    color: Colors.accent600,
  },
});
