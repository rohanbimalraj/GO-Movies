import { View, Image, Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";


function BackButton({ style }) {
  const navigation = useNavigation();

  function backButtonHandler() {
    navigation.goBack();
  }
  return (
    <Pressable onPress={backButtonHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.container, style]}>
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
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  pressed: {
    opacity: 0.5
  }
});
