import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";
import AppFonts from "../../constants/app-fonts";
import FavouriteButton from "./FavouriteButton";
import { Image } from 'expo-image'
import { useEffect, useState } from "react";
import { fetchBackdrop } from "../../utils/movies";

function ImageHeader({ title, ids }) {
  const [backdropUrl, setBackdropUrl] = useState(null);
  async function fetchBackdropUrl() {
    try {
      const backdropUrl = await fetchBackdrop(ids);
      setBackdropUrl(backdropUrl);
    } catch (error) {
      console.log("BACKDROP IMAGE ERROR:", error.message);
    }
  }
  useEffect(() => {
    fetchBackdropUrl();
  }, []);

  return (
    <View style={styles.header}>
      <Image
        style={styles.container}
        source={backdropUrl}
        placeholder={require('../../assets/placeholders/placeholder-background.jpeg')}
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={[styles.container]}
        >
          <View style={styles.titleContainer}>
            <View style={styles.bottomContainer}>
              <Text style={styles.title}>{title}</Text>
              <FavouriteButton />
            </View>
          </View>
        </LinearGradient>
      </Image>
    </View>
  );
}

export default ImageHeader;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: width * 0.65,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  backDroup: {
    width: width,
    height: width * 0.65,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 24,
    color: Colors.accent500,
    width: 300
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 30,
  },
});
