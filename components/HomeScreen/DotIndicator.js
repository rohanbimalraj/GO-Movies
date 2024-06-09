import { View, StyleSheet } from "react-native";
import Dots from "react-native-dots-pagination";
import Colors from "../../constants/colors";
import { PageIndicator } from 'react-native-page-indicator';

function DotIndicator({ length, currentIndex }) {
  return (
    <View style={styles.dotContainer}>
      {/* <Dots
        length={length}
        active={currentIndex}
        width={200}
        passiveColor="#ccc"
        activeColor={Colors.accent600}
        activeDotHeight={13}
        activeDotWidth={13}
      /> */}
      <PageIndicator count={length} current={currentIndex} color="#ccc" activeColor={Colors.accent600}/>
    </View>
  );
}

export default DotIndicator;

const styles = StyleSheet.create({
    dotContainer: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
      },
})
