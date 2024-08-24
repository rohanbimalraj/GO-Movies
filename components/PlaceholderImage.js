import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";

const PlaceholderImage = React.memo(({ source }) => {
    return (
      <View style={styles.placeholderContainer}>
        <Image
          style={styles.placeholder}
          source={source}
        />
      </View>
    );
  });

export default PlaceholderImage

const styles = StyleSheet.create({
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }, 
      placeholder: {
        flex: 1,
        width: '80%',
        contentFit: 'contain'
      }
})