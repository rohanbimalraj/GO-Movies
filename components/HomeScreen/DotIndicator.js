import { View, StyleSheet } from "react-native";
import Dots from "react-native-dots-pagination";
import Colors from "../../constants/colors";

function DotIndicator({ length, currentIndex }) {
  return (
    <View style={styles.dotContainer}>
      <Dots
        length={length}
        active={currentIndex}
        width={200}
        passiveColor="#ccc"
        activeColor={Colors.accent600}
        activeDotHeight={13}
        activeDotWidth={13}
      />
    </View>
  );
}

export default DotIndicator;

const styles = StyleSheet.create({
    dotContainer: {
        height: 20,
        marginVertical: 8,
        alignItems: 'center',
      },
})
