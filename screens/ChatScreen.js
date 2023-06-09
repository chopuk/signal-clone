import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Avatar} from 'react-native-elements'
import {FontAwesome, Ionicons} from 'react-native-vector-icons'
import { db,auth } from '../firebase'
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore'

const ChatScreen = ({navigation, route}) => {

  const [newMessage, setNewMessage] = useState('')
  const [messages,setMessages] = useState([])

  useEffect(()=> {
    // snapshot the chat messages
    // Note: snapshots are updated in real time
    const q = query(collection(db, '/chats/' + route.params.id + '/messages'), orderBy('timestamp'))
    onSnapshot(q, (snapshot) => {
      let chatMessages = []
      snapshot.forEach((doc) => {
        chatMessages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(chatMessages)
    })

  },[])

  useEffect(()=> {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Avatar
              rounded
              source={{uri: auth.currentUser.photoURL}}
            />
            <Text style={styles.title}>
              {route.params.chatName.toUpperCase()}
            </Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name='video-camera' size={22} 
              style={{color: 'white',marginLeft:15}} 
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChatScreen')}>
            <Ionicons name='call' size={22} 
              style={{color: 'white',marginLeft:15}} 
            />
          </TouchableOpacity>
        </View>
      )
    })
  },[])

  const sendMessage = async() => {
    Keyboard.dismiss()
    const userCredentials = auth.currentUser
    // add chat message
    const chatsRef = collection(db, 'chats', route.params.id, 'messages')
    await addDoc((chatsRef), {
      displayName: userCredentials.displayName,
      email: userCredentials.email,
      photoURL: userCredentials.photoURL,
      message: newMessage,
      timestamp: serverTimestamp()
    })

    setNewMessage('')

  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontWeight:'bold'}}>{route.params.chatDescription}</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingTop:15}}>
        {messages.map((message) => 
          message.email === auth.currentUser.email ? (
            <View key={message.id} style={styles.receiver}>
              <Text style={styles.receiverText}>{message.message}</Text>
            </View>
          ) : (
            <View key={message.id} style={styles.sender}>
                <Avatar
                  rounded
                  size={40}
                  source={{uri: message.photoURL}}
                />
                <View>
                  <Text style={styles.senderName}>{message.displayName}</Text>
                  <Text style={styles.senderText}>{message.message}</Text>
                </View>
            </View>
          )
        )}
      </ScrollView>
      <View style={styles.chatFooter}>
        <TextInput
          style={styles.textInput}
          placeholder='Signal Message'
          value={newMessage}
          onChangeText={(text)=>setNewMessage(text)}
          onSubmitEditing={sendMessage}
        >
        </TextInput>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={sendMessage}
        >
          <Ionicons 
              name='send' size={22} 
              style={{color: '#2b68e6'}} 
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:5,
    backgroundColor:'white'
  },
  title: {
    color:'white',
    marginLeft:10,
    fontWeight:'700'
  },
  headerRight: {
    flexDirection:'row',
    justifyContent:'center',
    width:80,
    marginight:20
  },
  chatFooter: {
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    padding:15
  },
  textInput: {
    bottom:0,
    height:40,
    flex:1,
    borderColor: 'transparent',
    backgroundColor:'#ececec',
    borderWidth:1,
    padding:10,
    color:'grey',
    borderRadius:30,
    marginRight:15
  },
  sender: {
    padding:10,
    backgroundColor:'#267d3f',
    borderRadius:10,
    marginRight:50,
    marginBottom:10,
    flexDirection:'row'
  },
  senderText: {
    color:'white',
    fontWeight:'500',
    marginLeft:10,
    fontSize:16
  },
  senderName: {
    left:10,
    paddingRight:10,
    fontSize:14,
    color:'white'
  },
  receiver: {
    padding:10,
    backgroundColor:'#e5edaf',
    borderRadius:10,
    marginLeft:50,
    marginBottom:10
  },
  receiverText: {
    color:'black',
    fontWeight:'500',
    fontSize:16
  }
})

export default ChatScreen