import { View, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.accent600} />
    </View>
  );
}

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // optional background color for better visibility
    },
  });