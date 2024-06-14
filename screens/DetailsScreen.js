import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

//DUMMY  DATA
import movieDetail from '../data/movie-detail.json'
import ImageHeader from "../components/DetailsScreen/ImageHeader";

function DetailsScreen() {

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <ScrollView>
        <SafeAreaView style={styles.rootContainer}>
          <ImageHeader title={movieDetail.title} backdropPath={movieDetail.backdrop_path}/>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overview}>{movieDetail.overview}</Text>
        </SafeAreaView>
      </ScrollView>
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
  overview: {
    fontFamily: AppFonts.SG_Medium,
    color: Colors.accent500,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  overviewTitle: {
    paddingHorizontal: 20,
    paddingTop: 10,
    fontFamily: AppFonts.SG_Bold,
    color: Colors.accent500,
    fontSize: 20,
    textDecorationLine: 'underline'
  }
});
