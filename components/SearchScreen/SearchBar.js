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

function SearchBar({ onEndEditing, onClear }) {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(text ? 1 : 0, { duration: 500 });
  }, [text]);

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
      onEndEditing(debouncedText)
    }
  }, [debouncedText]);

  function onReturnHandler() {
    Keyboard.dismiss();
  }

  function onTextChangeHandler(text) {
    console.log(text);
    setText(text);
  }

  function onClearHandler() {
    setText("");
    onClear()
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
    marginTop: 40,
    marginBottom: 20,
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
