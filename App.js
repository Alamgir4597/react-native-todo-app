import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import SignScreen from './src/screens/SignScreen';
import UpScreen from './src/screens/UpScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name='Welcome'
         component={WelcomeScreen}
          options={{
            headerShown: false
          }}
       />
        <Stack.Screen
          name='Signin'
          component={SignScreen}
          options={{
            title: 'Sign Up', //Set Header Title
          }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{
            title: 'Sign Up', //Set Header Title
          }}
        />
        <Stack.Screen
          name='todo'
          component={HomeScreen}
          options={{
            title: 'Todo List', //Set Header Title
          }}
        />
        <Stack.Screen
          name='UpScreen'
          component={UpScreen}
          options={{
            title: 'Update', //Set Header Title
          }}
        />
      
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
