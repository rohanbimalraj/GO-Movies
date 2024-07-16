import { View, Text, StyleSheet } from "react-native";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";

function MoreDetailCard({ title, elements }) {
  // const requiredElements = elements.slice(0, 10);
  const tempArray = ['Rohan', 'Bimal', 'Raj']// requiredElements.map(obj => obj.name)
  // const requiredStr = tempArray.join(", ");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* <Text style={styles.content}>{requiredStr}</Text> */}
      <View style={styles.namesContainer}>
        {/* {tempArray.map(name => <Text style={styles.content} key={name}>{name}</Text>)} */}
        {tempArray.map((name, index, arr) => {
          if (index === arr.length - 1) {
            return <Text style={styles.content} key={name}>{name} </Text>
          }
          return <Text style={styles.content} key={name}>{name + ', '} </Text>
        })}
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
    // paddingVertical: 10,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.accent500,
    opacity: 0.5,
  },
  namesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10
  }
});
