import {Alert, ScrollView, StyleSheet, View} from 'react-native'
import React, {useLayoutEffect,useState} from 'react'
import {Button,Input, Text} from 'react-native-elements'
import {auth} from '../firebase'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import AddUserPhoto from '../components/AddUserPhoto'

const RegisterScreen = ({navigation}) => {

    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [photoURL,setPhotoURL] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [base64Image, setBase64Image] = useState('')
    const [uri, setUri] = useState(null)

    useLayoutEffect(()=> {
        navigation.setOptions({
            // can set various options here if you want
        })
    },[navigation])

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser,{
                displayName: fullName,
                photoURL: photoURL || 'avatar-placeholder.png'
            })
            navigation.navigate('LoginScreen')
        } catch (error) {
            Alert.alert('Firebase Error',error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text h4 style={{marginBottom:20}}>Create a Signal Account</Text>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder='Full Name' 
                        value={fullName} 
                        onChangeText={(text) => setFullName(text)}
                    />
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
                    <AddUserPhoto 
                        photoURL={photoURL} 
                        setPhotoURL={setPhotoURL}
                        setBase64Image={setBase64Image}
                        setUri={setUri}
                        email={email}
                    />
                </View>
                <Button 
                    title='Register' 
                    containerStyle={styles.button} 
                    onPress={register}
                />
            </ScrollView>
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
        width:300,
        marginTop:60
    },
    placeholder: {
        width: 300,
        height: 280
    },
})

export default RegisterScreen