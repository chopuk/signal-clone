import {Alert, StyleSheet,View} from 'react-native'
import React, {useEffect,useState} from 'react'
import {Button,Input,Image} from 'react-native-elements'
import {auth} from '../firebase'
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'

const LoginScreen = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userDetails, setUserDetails] = useState(null)

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate('HomeScreen')
        } catch (error) {
            Alert.alert('Firebase Error',error.message)
        }
    }

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            setUserDetails(user)
            if (user) {
                navigation.replace('HomeScreen')
            }
        })
    },[userDetails])

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/signal-logo.png')}
                style={styles.logo}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Email' 
                    value={email} 
                    autoCapitalize='none'
                    keyboardType='email-address'
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder='Password' 
                    secureTextEntry 
                    autoCapitalize='none'
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                />
            </View>
            <Button 
                title='Login' 
                containerStyle={styles.button} 
                onPress={signIn} 
            />
            <Button 
                title='Register' 
                containerStyle={styles.button} 
                type='outline'
                onPress={()=>navigation.navigate('RegisterScreen')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:300
    },
    logo:{
        width:150,
        height:150,
        marginBottom:20
    },
    button:{
        width:200,
        marginTop:5
    }
})

export default LoginScreen
