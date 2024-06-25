import { View, StyleSheet, Text } from "react-native";
import ReviewCard from "./ReviewCard";

function Reviews({ reviews }) {
  return (
    <View>
      {reviews.map((review) => (
        <ReviewCard
          author={review.author}
          date={"12 June 2024"}
          review={review.content}
          key={review.id}
        />
      ))}
    </View>
  );
}

export default Reviews;

const styles = StyleSheet.create({});
