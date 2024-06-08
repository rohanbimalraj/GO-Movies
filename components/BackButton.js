import { View, Image, Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/colors";

function BackButton({ onPress }) {
  
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.container}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color={Colors.accent500}
        />
      </View>
    </Pressable>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  pressed: {
    opacity: 0.5
  }
});
