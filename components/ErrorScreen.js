import { View, Text, StyleSheet, Pressable } from "react-native";
import AppFonts from "../constants/app-fonts";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

function ErrorScreen({ onRetry }) {
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.primary600]}
      style={styles.rootContainer}
    >
      <View style={styles.rootContainer}>
        <Text style={styles.title}>Oops something went wrong!! 😞</Text>
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onRetry}>
            <Text style={styles.retry}>Retry</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default ErrorScreen;

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontFamily: AppFonts.SG_Bold,
      fontSize: 18,
      color: Colors.accent500,
      marginBottom: 15
    },
    retry: {
        fontFamily: AppFonts.SG_SemiBold,
        fontSize: 18,
        color: Colors.accent600,
        textDecorationLine: 'underline'
    },
    pressed: {
        opacity: 0.5
    }
  });
  