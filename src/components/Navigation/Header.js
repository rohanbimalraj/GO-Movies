import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import AppFont from "../../constants/app-fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";

function Header({ title }) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: inset.top }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary700,
  },
  backButtonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "flex-end",
  },
  title: {
    textAlign: "center",
    fontFamily: AppFont.SG_Bold,
    fontSize: 17,
    color: Colors.accent500,
    paddingBottom: 8,
  },
});
