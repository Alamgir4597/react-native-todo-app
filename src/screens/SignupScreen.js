import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';



export default function SignupScreen({navigation}) {
 
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('');
  const  [errorMsg, setErrorMsg ] = useState('');
  const signupBtn = ()=>{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        if(user){
          navigation.navigate('todo')
        }
        // ...

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(error){
          setErrorMsg(errorCode);
        }else{
          setErrorMsg("");
        }
       
        console.log(errorMessage);
        // ..
      });
  };
  return (
    <View style={{alignItems:"center"}}>
      
     
      <TextInput placeholder='Email' style={styles.input} onChangeText={eText => setEmail(eText)} /> 
      <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={pText => setPassword(pText)} />

      <Button title="Signup" onPress={signupBtn}> Sign Up</Button>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ margin: 10, textAlign: "center", fontSize:14 }}>Already have an account  <AntDesign name="arrowright" size={24} color="black" /> </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signin')} style={styles.buttonE}>
          <Text style={styles.text}>SignIn</Text>

        </TouchableOpacity>
      </View>

      <Text style={{color:"red", fontSize:16}}>{errorMsg}</Text>
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
    padding: 5,
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