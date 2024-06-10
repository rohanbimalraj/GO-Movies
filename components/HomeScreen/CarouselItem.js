import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const BASE_URL = "https://image.tmdb.org/t/p/w780";
const width = Dimensions.get("window").width;

function CarouselItem({ id, title, backDropPath }) {
  const navigation = useNavigation();
  function onPressHandler() {
    console.log("Movie Id: ", id);
    navigation.navigate("Details");
  }
  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={1.0}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.container}
          source={{ uri: BASE_URL + backDropPath }}
          imageStyle={styles.backDroup}
        >
          <LinearGradient
            colors={["#00000000", "#000000"]}
            style={[styles.container]}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  backDroup: {
    width: width,
    height: width / 2,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 20,
    paddingLeft: 10,
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 18,
    color: Colors.accent500,
  },
});
