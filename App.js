import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
// import Auth from '@react-native-firebase/auth';
// import {Firebase} from './confiq'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import axios from 'react-native-axios';

export default function App() {

  const [view, setview] = useState()

  const [username, setusername] = useState();
  const [spassword, setpassword] = useState('');
  const [phonenumber, setphonenumber] = useState()
  const [conotp, setconotp] = useState()
  const [requestId, setrequestId] = useState('')

  console.log(phonenumber)
  console.log(conotp)
  console.log(requestId)


  // const [loged, setloged] = useState('no user loged');
  // const user = auth().currentUser;

  // if (user) {
  //   console.log('User email: ', user.email);
  // }

  // const [text, settext] = useState('signup');
  // const singup = () => {
  //   setview(<View>
  //     <Text>signup</Text>
  //     <TextInput
  //       style={{
  //         height: 50,
  //         width: 300,
  //         backgroundColor: 'red',
  //         padding: 20,
  //       }}
  //       onChangeText={e => setusername(e)}></TextInput>
  //     <TextInput
  //       style={{
  //         height: 50,
  //         width: 300,
  //         backgroundColor: 'red',
  //         top: 30,
  //       }}
  //       onChangeText={e => setpassword(e)}></TextInput>

  //     <View style={{ top: 40 }}>
  //       <Button title='signup' onPress={() => signupbtn()}></Button>
  //     </View>
  //     <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 16, top: 90 }}>
  //       {loged}
  //     </Text>
  //   </View>)
  //   settext('signup');
  //   setforgot(

  //   );
  // };
  // const login = () => {
  //   setview(<View>
  //     <Text>login</Text>
  //     <TextInput
  //       style={{
  //         height: 50,
  //         width: 300,
  //         backgroundColor: 'red',
  //         padding: 20,
  //       }}
  //       onChangeText={e => setusername(e)}></TextInput>
  //     <TextInput
  //       style={{
  //         height: 50,
  //         width: 300,
  //         backgroundColor: 'red',
  //         top: 30,
  //       }}
  //       onChangeText={e => setpassword(e)}></TextInput>
  //     <View style={{ top: 30, left: 170 }}><Text> <TouchableOpacity onPress={() => { forgotPassword() }}
  //       style={{ height: 20, width: 300, top: 30, left: 160 }}>
  //       <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 16 }}>forgot password ?</Text>
  //     </TouchableOpacity></Text></View>
  //     <View style={{ top: 40 }}>
  //       <Button title={text} onPress={() => loginbtn()}></Button>
  //     </View>
  //     <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 16, top: 90 }}>
  //       {loged}
  //     </Text>
  //   </View>)
  //   settext('login');
  //   setloged(user.email);
  //   setforgot(

  //   );
  // };



  // const otp = () => {
  //   setview(<View>
  //     <Text>Phone authentication</Text>
  //     <TextInput
  //       onChangeText={e => { setphonenumber(e) }}

  //       style={{ backgroundColor: 'red', width: 300, paddingLeft: 10 }} placeholder="enter phone number"
  //     ></TextInput>
  //     <View style={{ top: 30 }}>
  //       <TouchableOpacity
  //         onPress={() => { otpbt() }}
  //         style={{ width: 300, height: 30, backgroundColor: 'blue' }}><Text style={{ alignSelf: 'center', top: 3, fontSize: 16, color: '#fff', fontWeight: 'bold' }}>go</Text></TouchableOpacity>

  //     </View>
  //     <View style={{ top: 30 }}>
  //       <View>
  //         <Text>enter otp</Text>
  //         <TextInput style={{ width: 200, alignSelf: 'center', backgroundColor: '#ADD8E6', top: 10, }}

  //           onChangeText={setconotp}
  //         />
  //         <View style={{ top: 40 }}>
  //           <Button title="conform" onPress={conformotp} />
  //         </View>
  //       </View>
  //     </View>

  //   </View>)

  // }
  const api='bf236878-c910-11eb-8089-0200cd936042'
  const otpbt = () => {
    alert(phonenumber)
    console.log('number')
    axios.get(`https://2factor.in/API/V1/${api}/SMS/${phonenumber}/AUTOGEN`
      
    )
      .then((response) => response.data).then(result => {
        alert("otp send successfully")
        console.log(result.Details)
        setrequestId(result.Details)
        console.log(requestId)
      }

      )
      .catch((error) => {
        console.log(error)
      })
  }

  console.log(conotp)
  const conformotp = () => {
    console.log('ggggggggggggggggggggggggg' + requestId)
    axios.get(`https://2factor.in/API/V1/${api}/SMS/VERIFY/${requestId}/${conotp}`
    )
      .then((response) => response.data).then(result => {
        alert("verification successfully ")
        console.log(result)

      }

      )
      .catch((error) => {
        console.log(error)
      })

  }






  // console.log(username);
  // console.log(spassword);
  // const loginbtn = () => {
  //   auth()
  //     .signInWithEmailAndPassword(username, spassword)
  //     .then(() => {
  //       console.log('signed in!');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     });
  //   setloged(user.email);

  // }

  // const signupbtn = () => {

  //   auth()
  //     .createUserWithEmailAndPassword(username, spassword)
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     });
  // }





  // const forgotPassword = () => {
  //   auth()
  //     .sendPasswordResetEmail(username)
  //     .then(function (user) {
  //       alert('Please check your email...');
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  // };

  // async function onFacebookButtonPress() {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // }
  return (
    // <View style={{ top: 100 }}>
    //   <View>
    //     <Button title="signup" onPress={singup}></Button>
    //   </View>
    //   <View>
    //     <Button title="login" onPress={login}></Button>
    //   </View>
    //   <View>
    //     <Button title="phone auth" onPress={otp}></Button>
    //   </View>
    //   <View>
    //     <Button
    //       title="Facebook Sign-In"
    //       onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
    //     />
    //   </View>
    //   <View style={{ alignItems: 'center', top: 200 }}>
    //     {view}


    //   </View>
    // </View>
    <View>
      <Text>Phone authentication</Text>
      <TextInput
        onChangeText={e => { setphonenumber(e) }}

        style={{ backgroundColor: 'red', width: 300, paddingLeft: 10 }} placeholder="enter phone number"
      ></TextInput>
      <View style={{ top: 30 }}>
        <TouchableOpacity
          onPress={() => { otpbt() }}
          style={{ width: 300, height: 30, backgroundColor: 'blue' }}><Text style={{ alignSelf: 'center', top: 3, fontSize: 16, color: '#fff', fontWeight: 'bold' }}>go</Text></TouchableOpacity>

      </View>
      <View style={{ top: 30 }}>
        <View>
          <Text>enter otp</Text>
          <TextInput style={{ width: 200, alignSelf: 'center', backgroundColor: '#ADD8E6', top: 10, }}

            onChangeText={setconotp}
          />
          <View style={{ top: 40 }}>
            <Button title="conform" onPress={conformotp} />
          </View>
        </View>
      </View>

    </View>
  );
}
