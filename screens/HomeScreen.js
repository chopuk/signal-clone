import {ScrollView, StyleSheet,View,TouchableOpacity} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import {Avatar} from 'react-native-elements'
import {SimpleLineIcons, AntDesign} from 'react-native-vector-icons'
import { db,auth } from '../firebase'
import { collection, query, orderBy, onSnapshot} from 'firebase/firestore'
const HomeScreen = ({navigation}) => {

  const [chats,setChats] = useState([])

  const signOut = () => {
    
    auth.signOut()
    navigation.navigate('LoginScreen')
  }

  useEffect(()=> {

    const fetchChats = () => {
      
      const q = query(collection(db, '/chats'), orderBy('timestamp'))
      onSnapshot(q, (snapshot) => {
        let chats = []
        snapshot.forEach((doc) => {
          chats.push({ ...doc.data(), id: doc.id })
        })
        setChats(chats)
      })

    }

    fetchChats()

  },[])

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerTitle:'Signal',
      headerTitleStyle: {color:'black'},
      headerStyle: {backgroundColor:'white'},
      headerLeft: () => (
        <View style={{marginLeft:20}}>
          <TouchableOpacity onPress={signOut}>
            <Avatar
              rounded
              source={{uri: auth?.currentUser?.photoURL}}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={26} 
              style={{color: 'black',marginLeft:15}} 
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChatScreen')}>
            <SimpleLineIcons name='pencil' size={24} 
              style={{color: 'black',marginLeft:15}} 
            />
          </TouchableOpacity>
        </View>
      )
    })
  },[])

  return (
    <View style={styles.container}>
      <ScrollView>
        {chats.map((chat) => (
          <CustomListItem 
            chat={chat} 
            key={chat.id}
            navigation={navigation}/>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{},
  headerRight: {
    flexDirection:'row'
  }
})

export default HomeScreen