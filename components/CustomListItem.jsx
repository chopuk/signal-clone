import {StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import {Avatar, ListItem} from 'react-native-elements'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useState } from 'react'
import ENVIRONMENT from '../environment'

const CustomListItem = ({chat,navigation}) => {
  const {id,chatName,chatDescription,photoURL} = chat

  const [messages,setMessages] = useState([])

  useEffect(()=> {
    // snapshot the chat messages
    // Note: snapshots are updated in real time
    const q = query(collection(db, '/chats/' + id + '/messages'), orderBy('timestamp','desc'))
    onSnapshot(q, (snapshot) => {
      let chatMessages = []
      snapshot.forEach((doc) => {
        chatMessages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(chatMessages)
    })

  },[])

  const enterChat = () => {
    navigation.navigate('ChatScreen', {
      id: id,
      chatName: chatName,
      chatDescription: chatDescription
    })
  }

  return (
    <ListItem key={id} bottomDivider onPress={enterChat}>
        <Avatar
            rounded
            source={{
              uri: 
                messages.length > 0
                ? 
                messages[0]?.photoURL 
                :
                  ENVIRONMENT.PLACEHOLDER 
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:'800'}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle 
                numberOfLines={1}
                ellipsizeMode='tail'
            >   
              {messages.length > 0 && messages[0]?.displayName + ': ' + messages[0]?.message}
              {messages.length === 0 && 'No messages yet...'}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

const styles = StyleSheet.create({

})

export default CustomListItem