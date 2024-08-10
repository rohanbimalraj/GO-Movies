import { View, StyleSheet, Text, Pressable } from "react-native";
import ReviewCard from "./ReviewCard";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";
import SeeAllButton from "./SeeAllButton";

function Reviews({ reviews, pageCount }) {

  function seeAllHandler() {
    console.log('SEE ALL PRESSED')
  }
  const noReviews = reviews.length === 0;
  if (noReviews) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>No reviews yet!!!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <ReviewCard
          author={review.user.username}
          date={review.updated_at}
          review={review.comment}
          key={review.id}
        />
      ))}
      {pageCount > 1 && <SeeAllButton onPress={seeAllHandler}/>}
    </View>
  );
}

export default Reviews;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  messageContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 17,
    color: Colors.accent500,
    opacity: 0.7,
  }
});
