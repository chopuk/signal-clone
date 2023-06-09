import { StyleSheet,View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { db,auth } from '../firebase'
import { addDoc,collection,serverTimestamp} from 'firebase/firestore'

const AddChatScreen = ({navigation}) => {

    const [chatName,setChatName] = useState('')
    const [chatDescription,setChatDescription] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Add a new chat'
        })
    },[])

    const createChat = async () => {
        // create new chat
        const chatRef = collection(db, 'chats')
        await addDoc((chatRef), {
            chatName: chatName,
            chatDescription: chatDescription,
            photoURL: auth.currentUser.photoURL,
            timestamp: serverTimestamp()
        })
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a chat name'
                value={chatName}
                onChangeText={(text)=>setChatName(text)}
                onSubmitEditing={createChat}
                leftIcon= {
                    <Icon name='wechat' size={24} color='grey'/>
                }
            />
            <Input
                placeholder='Enter a chat description'
                value={chatDescription}
                onChangeText={(text)=>setChatDescription(text)}
                onSubmitEditing={createChat}
                leftIcon= {
                    <Icon name='wechat' size={24} color='grey'/>
                }
            />
            <Button disabled={!chatName} title='Create new chat' onPress={createChat}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:30,
        height:'100%'
    }
})

export default AddChatScreen