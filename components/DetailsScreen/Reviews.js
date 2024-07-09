import { View, StyleSheet, Text } from "react-native";
import ReviewCard from "./ReviewCard";

function Reviews({ reviews }) {
  const reversedArray = reviews.reverse()
  return (
    <View style={styles.container}>
      {reversedArray.map((review) => (
        <ReviewCard
          author={review.author}
          date={review.updated_at}
          review={review.content}
          key={review.id}
        />
      ))}
    </View>
  );
}

export default Reviews;

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});
