import { View, StyleSheet, Text } from "react-native";
import MoreDetailCard from "./MoreDetailCard";

function MoreDetails({ cast }) {
  const acting = cast.cast.filter(
    (person) => person.known_for_department === "Acting"
  );

  const directing = cast.crew.filter(
    (person) => person.known_for_department === "Directing"
  );

  const production = cast.crew.filter(
    (person) => person.known_for_department === "Production"
  );

  return (
    <View>
      <MoreDetailCard title="Actors" elements={acting} />
      <MoreDetailCard title="Directors" elements={directing} />
      <MoreDetailCard title="Production" elements={production} />
    </View>
  );
}

export default MoreDetails;

const styles = StyleSheet.create({});
