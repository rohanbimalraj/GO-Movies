import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Pressable, Keyboard } from "react-native";
import Colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AppFonts from "../../constants/app-fonts";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

function SearchBar() {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [visible, setVisible] = useState(false);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    if (debouncedText) {
      console.log("Making API call with:", debouncedText);
    }
  }, [debouncedText]);

  function onReturnHandler() {
    Keyboard.dismiss();
  }

  function onTextChangeHandler(text) {
    console.log(text);
    toggleVisibility()
    setText(text);
  }

  function onClearHandler() {
    setText("");
  }

  function toggleVisibility() {
    if (text !== '') {
      opacity.value = withTiming(0, { duration: 500 });
      setTimeout(() => setVisible(false), 500); // Set visible to false after the animation
    } else {
      setVisible(true);
      opacity.value = withTiming(1, { duration: 500 });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <View style={styles.searchIcon}>
          <FontAwesome name="search" size={24} color={Colors.primary700} />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onTextChangeHandler}
          value={text}
          placeholder="Search movies..."
          placeholderTextColor={Colors.primary700}
          returnKeyType="return"
          onSubmitEditing={onReturnHandler}
          selectionColor={Colors.accent600}
          autoCorrect={false}
        />
        {text !== "" && (
          <Animated.View style={animatedStyle}>
            <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={onClearHandler}
          >
            <View style={styles.closeButtonContainer}>
              <AntDesign
                name="closecircle"
                size={18}
                color={Colors.primary700}
              />
            </View>
          </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: Colors.primary500,
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 5,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  input: {
    fontFamily: AppFonts.SG_Medium,
    color: Colors.primary700,
    flex: 1,
  },
  closeButtonContainer: {
    paddingHorizontal: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
