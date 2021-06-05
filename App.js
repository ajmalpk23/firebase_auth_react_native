import React, {useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
// import Auth from '@react-native-firebase/auth';
// import {Firebase} from './confiq'
import auth from '@react-native-firebase/auth';

export default function App() {
  const [username, setusername] = useState('');
  const [spassword, setpassword] = useState('');
  const [loged,setloged] = useState('no user loged')
  const user = auth().currentUser;
  

if (user) {
 console.log('User email: ', user.email);
}


  const [text, settext] = useState('signup');
  const singup = () => {
    settext('signup');
  };
  const login = () => {
    settext('login');
    setloged(user.email)
  };

  console.log(username);
  console.log(spassword);
 
  const press = () => {
    if (text === 'login') {
      auth()
      .signInWithEmailAndPassword(username, spassword)
      .then(() => {
        console.log('signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
  
        console.error(error);
      });
      setloged(user.email)
      
    
    }else{
     
      auth()
      .createUserWithEmailAndPassword(username, spassword)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
  
        console.error(error);
      });
    }
   
  };



  return (
    <View style={{top: 100}}>
      <View>
        <Button title="signup" onPress={singup}></Button>
      </View>
      <View>
        <Button title="login" onPress={login}></Button>
      </View>
      <View style={{alignItems: 'center', top: 200}}>
        <Text>{text}</Text>
        <TextInput
          style={{
            height: 50,
            width: 300,
            backgroundColor: 'red',
            padding: 20,
          }}
          onChangeText={e => setusername(e)}></TextInput>
        <TextInput
          style={{
            height: 50,
            width: 300,
            backgroundColor: 'red',
            top: 30,
          }}
          onChangeText={e => setpassword(e)}></TextInput>

        <View style={{top: 40}}>
          <Button title={text} onPress={() => press()}></Button>
        </View>
        <Text style={{fontWeight:'bold',color:'red',fontSize:16,top:90}}>{loged}</Text>
      </View>
    </View>
  );
}
