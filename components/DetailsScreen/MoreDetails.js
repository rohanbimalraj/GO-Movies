import { View, StyleSheet, Text } from "react-native";
import MoreDetailCard from "./MoreDetailCard";

function MoreDetails({ credits }) {
  const acting = credits.cast.map((item) => {
    return item.person;
  });
  const directing = credits.crew.directing
    .filter((person) => person.job === "Director")
    .map((obj) => {
      return obj.person;
    });

  const production = credits.crew.production
    .filter((person) => person.job === "Producer")
    .map((obj) => {
      return obj.person;
    });

  return (
    <View>
      {acting.length > 0 && <MoreDetailCard title="Actors" elements={acting} />}
      {directing.length > 0 && (
        <MoreDetailCard title="Directors" elements={directing} />
      )}
      {production.length > 0 && (
        <MoreDetailCard title="Production" elements={production} />
      )}
    </View>
  );
}

export default MoreDetails;

const styles = StyleSheet.create({});
