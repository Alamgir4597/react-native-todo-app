import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { db } from '../../firebase.init'

import { collection, doc, Firestore, getDocs, updateDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function UpScreen({ route }) {
    // const  navigation = useNavigation();
const navigation = useNavigation();
  // const docRef = doc(db, "todo", route.params.item.id )
  console.log(route.params.setLoading);
  const loading = route.params.setLoading
  const [changeTodoText, setchangeTodoText] = useState(route.params.item.text);
// console.log(changeTodoText);
  const updateToDo = async () => {
  
    const ref = doc(db, 'todo', route.params.item.id)
    await updateDoc(ref, {
      text: changeTodoText,
      
    }).then(() => {
      navigation.navigate("todo");
      loading(true)
    }).catch((error) => {
      console.log5(error)
    })
  
    
  };
  const [refreshing, setRefreshing] = React.useState(false);
  
  return (
  <SafeAreaView> 
    <View style={{ height: 150, backgroundColor: "green", marginTop: 100, alignItems: "center" }}>
        <Text>Update Todo</Text>
        <TextInput style={styles.input}
          placeholder="Type here to translate!"
          onChangeText={setchangeTodoText}
          defaultValue={changeTodoText}
        /> 
      <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.buttonE} onPress={() => updateToDo()}>
            <Text style={styles.text}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonE} onPress={() => navigation.navigate("todo")}>
            <Text style={styles.text}>Cacel</Text>
          </TouchableOpacity>
      </View>

      </View>
    
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#e8e8e8'
  },
  buttonE: {
    marginLeft: 5,
    backgroundColor: "#1a8cff",
    padding: 5
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
})