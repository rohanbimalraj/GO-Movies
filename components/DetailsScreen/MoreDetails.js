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
      {/* {acting.length > 0 && <MoreDetailCard title="Actors" elements={acting} />}
      {directing.length > 0 && <MoreDetailCard title="Directors" elements={directing} />}
      {production.length > 0 && <MoreDetailCard title="Production" elements={production} />} */}
      <Text>More Details</Text>
      <Text>{acting.length > 0 ? 'Acting' : 'No Acting'}</Text>
      <Text>{directing.length > 0 ? 'Directing' : 'No Directing'}</Text>
      <Text>{production.length > 0 ? 'Production' : 'No Production'}</Text>
    </View>
  );
}

export default MoreDetails;

const styles = StyleSheet.create({});
