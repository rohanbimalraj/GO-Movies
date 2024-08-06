import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AppFonts from "../../constants/app-fonts";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { fetchMoviePoster } from "../../utils/movies";

function MoviePoster({ ids, title, width, height }) {
  const navigation = useNavigation();
  const [posterUrl, setPosterUrl] = useState(null);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = await fetchMoviePoster(ids);
    setPosterUrl(url);
  }

  function onLoadHandler() {
    opacity.value = withTiming(0, { duration: 500 });
  }

  function onPressHandler() {
    if (ids) {
      navigation.navigate("Details", { ids: ids });
    }
  }

  function DefaultBanner() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../assets/placeholders/placeholder-poster.jpeg")}
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={styles.backgroundImage}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPressHandler}
    >
      <View style={[styles.rootContainer, { width: width, height: height }]}>
        <Image source={posterUrl} style={styles.image} onLoad={onLoadHandler} />
        <Animated.View style={[styles.defaultBannerContainer, animatedStyle]}>
          <DefaultBanner />
        </Animated.View>
      </View>
    </Pressable>
  );
}

export default MoviePoster;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 10,
    margin: 6,
    backgroundColor: "red",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pressed: {
    opacity: 0.5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontFamily: AppFonts.SG_Bold,
    fontSize: 16,
    color: Colors.accent500,
    textAlign: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  defaultBannerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
