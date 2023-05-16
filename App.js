import {StatusBar} from 'expo-status-bar'
import {StyleSheet,Text,View} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
  setTimeout(async () => {
    await SplashScreen.hideAsync()
  }, 2000)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar barStyle = 'light-content' hidden ={false} backgroundColor = '#2499d8' translucent ={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
