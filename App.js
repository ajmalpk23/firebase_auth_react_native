import React, {useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
// import Auth from '@react-native-firebase/auth';
// import {Firebase} from './confiq'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default function App() {
  const [username, setusername] = useState();
  const [spassword, setpassword] = useState('');
  const [kkkk, setforgot] = useState('');

  const [loged, setloged] = useState('no user loged');
  const user = auth().currentUser;

  if (user) {
    console.log('User email: ', user.email);
  }

  const [text, settext] = useState('signup');
  const singup = () => {
    settext('signup');
    setforgot();
  };
  const login = () => {
    settext('login');
    setloged(user.email);
    setforgot(
      <TouchableOpacity onPress={()=>{forgotPassword()}}
        style={{height: 20, width: 300,top: 30,left:160}}>
          <Text style={{fontWeight:'bold',color:'blue',fontSize:16}}>forgot password ?</Text>
      </TouchableOpacity>
    );
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
      setloged(user.email);
    } else {
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

  const forgotPassword = () => {
auth()
      .sendPasswordResetEmail(username)
      .then(function (user) {
        alert('Please check your email...');
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  return (
    <View style={{top: 100}}>
      <View>
        <Button title="signup" onPress={singup}></Button>
      </View>
      <View>
        <Button title="login" onPress={login}></Button>
      </View>
      <View>
      <Button
      title="Facebook Sign-In"
      onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
    />
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
       <View style={{top:30,left:170}}><Text>{kkkk}</Text></View>
        <View style={{top: 40}}>
          <Button title={text} onPress={() => press()}></Button>
        </View>
        <Text style={{fontWeight: 'bold', color: 'red', fontSize: 16, top: 90}}>
          {loged}
        </Text>
      </View>
    </View>
  );
}
