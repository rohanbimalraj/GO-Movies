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
      {acting.length > 0 && <MoreDetailCard title="Actors" elements={acting} />}
      {directing.length > 0 && <MoreDetailCard title="Directors" elements={directing} />}
      {production.length > 0 && <MoreDetailCard title="Production" elements={production} />}
    </View>
  );
}

export default MoreDetails;

const styles = StyleSheet.create({});
