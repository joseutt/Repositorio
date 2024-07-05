import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth";
import { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR1IzP6YYRaArt3TCPDec2mxqFXgLauDg",
  authDomain: "paraexamen-fa5d5.firebaseapp.com",
  projectId: "paraexamen-fa5d5",
  storageBucket: "paraexamen-fa5d5.appspot.com",
  messagingSenderId: "748034211593",
  appId: "1:748034211593:web:5e3faf744856c61e74ddd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const AuthScreen = ({email,setEmail, password,setPassword, isLogin,setIsLogin, handleAuthentication}) => {
  return(
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In': 'sign Up'}</Text>
      <TextInput 
      style={styles.input}
      value={email}
      onChangeText={setEmail}
      placeholder="Email"
      autoCapitalize="none"
      />
      <TextInput 
      style={styles.input}
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In': 'sign Up'} 
        color='#3498db'
        onPress={handleAuthentication} 
        
        />
      </View>

      <View style={styles.buttonContainer} >
        <Text style={styles.buttonContainer} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? sign Up': 'Already have an account? sign In'}
        </Text>
      </View>

    </View>
  );
}

const AuthenticatedScreen = ({user,handleAuthentication}) =>{
  return(
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="LogOut" onPress={handleAuthentication} color="#e74c3c"></Button>
    </View>
  );
}

export default function App() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [isLogin,setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setUser(user);
    });
    return ()=>unsubscribe();
  },[auth]);

  const handleAuthentication = async ()=>{
    try {
      if (user) {
        console.log('User logged');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed succesfully');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created succesfully');
        }
      }
    } catch (error) {
      console.error('Autentication error: ', error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ): (
        <AuthScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuthentication={handleAuthentication}
        />
      )}
      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
