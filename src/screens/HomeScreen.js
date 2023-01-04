import { ActivityIndicator, Alert, Button, FlatList, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase.init'
import {  sendEmailVerification, signOut } from 'firebase/auth';
import AddTodoModel from '../components/AddTodoModel';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"; 

import BouncyCheckbox from 'react-native-bouncy-checkbox';




export default function HomeScreen({navigation}) {
  const currentUser = auth.currentUser.email;
  // console.log("Current User", currentUser , "End");
  const  [modelVisible , setModelVisible] = useState(false);
  const [toDos, setTodos] = useState([]);
  const [ loading, setLoading] = useState(true);
  // const [errText, seterrText] = useState();
  const logOut = ()=>{
    signOut(auth).then(() => {
      if(signOut){
        navigation.navigate('Welcome');
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  const showContent= ()=>{
    return(
      <View>
      
          <TouchableOpacity style={styles.buttonE} onPress={() => setModelVisible(true)}>
            <Text style={styles.text} >Add Todo</Text>
          </TouchableOpacity>
        {loading ? <ActivityIndicator /> : showAllTodos()}
    
      </View>
    )
  };
const emailVerificationBtn= ()=>{
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      alert('Email verification sent');
      navigation.navigate("signin");
    });
} ;
  const showEmailVerification= ()=>{
   return( 
    <View>
       <Text> Please verify your email to use App </Text>
       <Button title='send verification' onPress={emailVerificationBtn}></Button>   

      
    </View>  
    )
  };

  let addTodo = async (todo) => {
// console.log(todo);
    if (typeof todo === 'string' && todo.trim().length === 0 ){
      alert("Write Todo Name");
   
    }else{
      const docRef = await addDoc(collection(db, "todo"), {
        text: todo,
        completed: false,
        userId: auth.currentUser.uid
      })
       console.log("Document written with ID: ", docRef);
      alert(`todo added successfully ` );
    }
}
 
  const loadTodos = async() =>{

    const q = query(collection(db, "todo"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
      let toDos = [];
      querySnapshot.forEach((doc) => {
      let todo = doc.data();
      todo.id = doc.id;
      toDos.push(todo);
      
    });
    // console.log(toDos);
    setTodos(toDos);
    setLoading(false);
  };

  if(loading){
    loadTodos();
  };
  // useEffect(()=>{
    // loadTodos();
  // },[]);
  const checkToDoItem =  async ({item, isChecked}) => {
    // console.log(item);
    // console.log(isChecked);
    const ref = doc(db, 'todo', item.id)
    await updateDoc(ref, {
      completed: isChecked,

    }).then(() => {
     console.log('Updated')
    }).catch((error) => {
      console.log(error.message)
    })
  }
 
  const renderItem = ({item}) => {
    // console.log(item);
      return(
    
 <SafeAreaView  style={{flex:1, justifyContent:"center"}} >
          <ScrollView style={{  margin:15 }} >
            

            <View style={{ flex: 1, flexDirection: "row", margin: 5, padding: 5, justifyContent: "space-between" }} >
              <View>
                <BouncyCheckbox
                  isChecked={item.completed}
                  size={25}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text={item.text}
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}

                  onPress={(isChecked) => checkToDoItem({ item, isChecked })}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <Pressable style={styles.buttonE} onPress={() => navigation.navigate("UpScreen", { item })} >
                  <Text style={styles.text}>Edit</Text>
                </Pressable>
                <Pressable style={styles.buttonD} onPress={() => showConfirmDialog(item.id)}>
                  <Text style={styles.text}>Delete</Text>
                </Pressable>


              </View>
            </View> 
          </ScrollView>
 </SafeAreaView>


        
 
      )
  };
  const showConfirmDialog = (d) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to Delete this Todo? This action cannot be undone!",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteTodo(d)
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
 
  const showAllTodos =  () =>{
       return(
         <SafeAreaView style={{  marginBottom:20}}>
           <FlatList
             data={toDos}
             renderItem={renderItem}
             keyExtractor={item => item.id}
           />
        </SafeAreaView>
         
        );
  };
const deleteTodo = async (todoId) => {
  // console.log(todoId);

  await deleteDoc(doc(db, "todo" , todoId));
  const updatedToDos = [...toDos].filter((item) => item.id != todoId);
  setTodos(updatedToDos);
  alert("todo deleted successfully")
};



  return (
    <SafeAreaView>
      <Text style={{textAlign:"center", fontSize:50}} >Todos</Text>
      <View style={{ alignItems: "center" , flexDirection:"row", justifyContent:"space-around"}} >
        

         
          <Text>Email: {currentUser}</Text>
          <TouchableOpacity style={styles.buttonE} title='Log Out' onPress={logOut} >
            <Text style={styles.text}> Log Out</Text>
          </TouchableOpacity>
       
      </View>
      
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          margin:10
        }}
      />
      
    
        <Modal animationType='slide' transparent={true} visible={modelVisible} onRequestClose={() => setModelVisible(false)}>
          <AddTodoModel onClose={() => setModelVisible(false)} addTodo={addTodo} />
        </Modal>
      
       
      <View>
        {auth.currentUser.emailVerified ? showContent() : showEmailVerification()}
      </View>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 44,
    padding: 0,
    marginTop: 10,
   marginBottom:20,
    backgroundColor: '#e8e8e8'
  },
  
        buttonD: {
    marginStart:5,
          backgroundColor: "#1a8cff",
    padding:5
  },
  buttonE:{
    marginLeft:0,
    backgroundColor: "#1a8cff",
    padding: 5,
    marginBottom:3
  },
  text:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign:"center"
  },
   errText:{
    color: "red"
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  
 

})