import {  StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function AddTodoModel(props) {
    const[todo, setTodo] = useState("");
    
    
  return (
    <View style={{height:200, backgroundColor:"green" , marginTop:200, alignItems:"center"}}>
      
             
      <TextInput  placeholder='add todo' onChangeText={eText => setTodo(eText)} style={styles.input}/> 
     
      <View style={{flexDirection:"row" , justifyContent:"space-between", }}>
        <TouchableOpacity  style={styles.buttonE} title='Cancel' onPress={props.onClose}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonE} 
        onPress={ ()=>{
            props.addTodo(todo);
            setTodo("");
            props.onClose();
            }
          }
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 40,
    marginBottom: 10,
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
  },
  errorText:{
    color: "red"
  }
})