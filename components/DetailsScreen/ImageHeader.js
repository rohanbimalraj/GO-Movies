import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";
import BackButton from "../BackButton";

const BASE_URL = "https://image.tmdb.org/t/p/w780";

function ImageHeader({ title, backdropPath }) {
  const [loading, setLoading] = useState(true);
  function onLoad() {
    setLoading(false);
  }

  return (
    <View style={styles.header}>
      <ImageBackground
        style={styles.container}
        source={{ uri: BASE_URL + backdropPath }}
        imageStyle={styles.backDroup}
        onLoad={onLoad}
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={[styles.container]}
        >
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={Colors.primary600} />
            </View>
          )}

          <BackButton style={styles.backButton} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

export default ImageHeader;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: width * 0.8,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  backDroup: {
    width: width,
    height: width * 0.8,
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
    fontSize: 24,
    color: Colors.accent500,
  },
  backButton: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // semi-transparent white background
  },
});
