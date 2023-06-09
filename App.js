import 'react-native-gesture-handler'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import AddChatScreen from './screens/AddChatScreen'
import ChatScreen from './screens/ChatScreen'

const Stack = createNativeStackNavigator()
const globalScreenOptions = {
  headerStyle: {backgroundColor:'#2c6bed'},
  headerTitleStyle: {color:'white'},
  headerTintColor:'white',
  headerTitleAlign: 'center'
}

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
  setTimeout(async () => {
    await SplashScreen.hideAsync()
  }, 2000)

  return (
    <>
      <StatusBar style = 'light' hidden ={false} backgroundColor = '#2c6bed' translucent ={true}/>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={globalScreenOptions}
          initialRouteName='LoginScreen'
        >
          <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerTitle:'Please Login'}}/>
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerTitle:'Please Register'}}/>
          <Stack.Screen name='HomeScreen' component={HomeScreen}/>
          <Stack.Screen name='AddChatScreen' component={AddChatScreen}/>
          <Stack.Screen name='ChatScreen' component={ChatScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
