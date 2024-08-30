import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppFonts from "../../constants/app-fonts";
import Colors from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { fetchFallbackPoster } from "../../utils/https";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { fetchThumbnail } from "../../utils/movies";

const CarouselItem = React.memo(({ item }) => {
  const navigation = useNavigation();
  const title = item.title;
  const [posterUrl, setPosterUrl] = useState(null);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  async function fetchData() {
    try {
      const url = await fetchThumbnail(item.ids);
      setPosterUrl(url);
    } catch (error) {
      console.log(error.message);
    }
  }
  function onLoadHandler() {
    opacity.value = withTiming(0, { duration: 500 });
  }
  function onPressHandler() {
    navigation.navigate("Details", { ids: item.ids });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const DefaultBanner = React.memo(() => {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../../assets/placeholders/placeholder-background.jpeg")}
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
    );
  });
  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={1.0}>
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{ uri: posterUrl }}
          onLoad={onLoadHandler}
          priority='high'
        />
        <Animated.View style={[styles.defaultBannerContainer, animatedStyle]}>
          <DefaultBanner />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
});

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  defaultBannerContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    contentFit: "fill",
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
