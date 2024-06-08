import { View, Text, StyleSheet, Button } from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";

function DetailsScreen({ navigation }) {
  function backButtonHandler() {
    navigation.goBack();
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={backButtonHandler}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Detail Screen</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backButtonContainer: {
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 24,
    color: Colors.accent500,
  },
});
