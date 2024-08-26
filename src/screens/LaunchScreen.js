import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { homeScreenDidFetchData } from "../redux/homeSlice";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS
} from "react-native-reanimated";
import { View, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Colors from "../constants/colors";

function LaunchScreen({ children }) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const didFetchHomeScreenData = useSelector(homeScreenDidFetchData);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onImageLoaded = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAppReady(true);
    }, 5000);

    if (didFetchHomeScreenData) {
      setIsAppReady(true);
      clearTimeout(timeoutId);
    }
    return () => clearTimeout(timeoutId);
  }, [didFetchHomeScreenData]);

  useEffect(() => {
    if (isAppReady) {
      opacity.value = withDelay(
        800,
        withTiming(0, { duration: 500 }, (isFinished) => {
          if (isFinished) {
            runOnJS(setAnimationCompleted)(true);
          }
        })
      );
    }
  }, [isAppReady]);

  return (
    <View style={styles.launchContainer}>
      <View
        style={[styles.appContentContainer, { opacity: isAppReady ? 1 : 0 }]}
      >
        {children}
      </View>
      {animationCompleted ? null : (
        <Animated.View style={[styles.launchImageContainer, animatedStyle]}>
          <Image
            source={require("../../assets/splash.png")}
            onLoadEnd={onImageLoaded}
            style={[styles.launchImage]}
            resizeMode="contain"
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default LaunchScreen;

const styles = StyleSheet.create({
  launchContainer: {
    flex: 1,
  },
  appContentContainer: {
    flex: 1,
    zIndex: 1,
  },
  launchImageContainer: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: Colors.primary700,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  launchImage: {
    width: "100%",
    height: "100%",
  },
});
