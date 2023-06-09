import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { ref, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'

const AddUserPhoto = ({photoURL, setBase64Image, setUri, setPhotoURL, email}) => {
  
  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: true
    })

    if (!result.canceled) {
        const uri = result.assets[0].uri
        setBase64Image(result.assets[0].base64)
        setUri(uri)
        saveImageToFirebase(uri)
    }
  }

  const saveImageToFirebase = async(uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const storage = getStorage()
    const imageRef = ref(storage, 'userPhotos/' + email)
    await uploadBytes(imageRef, blob)
    const url = await getDownloadURL(imageRef)
    setPhotoURL(url)
  }

  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        {
          photoURL ? 
            <Image
                style={styles.placeholder}
                source={{uri: photoURL}}
            /> : 
            <Image
                style={styles.placeholder}
                source={require('../assets/images/user-profile-photo-placeholder.jpg')}
            /> 
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    width: 300,
    height: 280
  }
})

export default AddUserPhoto