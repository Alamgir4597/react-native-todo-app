import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase.init';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { AntDesign } from '@expo/vector-icons';

export default function SignScreen({ navigation }) {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const signinBtn = ()=>{
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user);
       
      
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode);
        setErrorMsg(errorMessage);
        // ..
      });

    
  };
  if (auth.currentUser) {
    navigation.navigate("todo")
  }else{
    onAuthStateChanged( auth , (user)=>{
      if(user){
        navigation.navigate("todo")
      }
    })
  }


  return (
    <View style={{flex:1 , justifyContent:"center", alignItems:"center"}}>
     
      <TextInput placeholder='Email' style={styles.input} onChangeText={eText => setEmail(eText)} />
      <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={pText => setPassword(pText)} /> 

      
      <Button title="Login" onPress={signinBtn}/>
         
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={{ margin: 20, textAlign: "center",  }}>Don't have an account  <AntDesign name="arrowright" size={24} color="black" /> </Text>
       
        <TouchableOpacity
         onPress={() => navigation.navigate('Signup')} style={styles.buttonE}>
          <Text style={styles.text}>Please Sign Up</Text>

        </TouchableOpacity>
      </View>
      <Text style={{ color: "red", fontSize: 16 }}>{errorMsg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
    },
  buttonE: {
   padding:5,
    backgroundColor: "#1a8cff",
  
   
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: "center",
   
  },
})