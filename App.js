import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from './constants/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: Colors.accent500}}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary700,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
