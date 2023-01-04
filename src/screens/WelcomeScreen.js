import { View, Text, StyleSheet, SafeAreaView, Button, ImageBackground } from 'react-native'
import React from 'react'
import image from "../../assets/todo-back.jpg"

export default function WelcomeScreen({navigation}) {
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.image} source={image} >
          <View style={{ alignItems: "center" }}>
              <Text style={styles.text} >Welcome Todo</Text>
              
               
              <Button
                  title="Please Login/Register"
                  onPress={() => navigation.navigate('Signin')}
              />
          </View>
      </ImageBackground>  
    </SafeAreaView>
     
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "black",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
   
  }
})