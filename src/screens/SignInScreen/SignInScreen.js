import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';




import {
  auth,
  onAuthStateChangedListener,
  signInWithGooglePopup,
} from '../../../firebase/firebase.config';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [button, setButton] = useState('Sign In');

  useEffect(() => {
    onAuthStateChangedListener(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        navigation.navigate('Main');
      }
    });
  }, []);

  const handleLogin = async () => {
    if (!email) {
      alert('Please enter email');
      return;
    }

    if (!password) {
      alert('Please enter password');
      return;
    }

    setButton('Signing In...');

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;

        navigation.navigate('Main');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/wrong-password':
            alert('incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
          default:
            alert(error);
        }
      });


    setButton('Sign In');
  };

 

  const handleResetPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          alert('Password reset email sent!');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('Please enter email');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}>
        <View>
          <Image
            source={require('./../../../assets/superman.png')}
            style={{width: 180, height: 130, marginTop: 50}}
          />
          <Text style={{fontSize: 30, marginVertical: 10, color: 'black'}}>
            Sign In Here
          </Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor="#000"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: '#2645BD',
              width: 150,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              display: 'flex',
            }}
            onPress={() => handleLogin()}>
            <Text style={{color: '#ffffff'}}>{button}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: '#1A60BC',
              width: 150,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              display: 'flex',
            }}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: '#ffffff'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{margin: 40}}>
          <Text
            style={{color: '#F48024'}}
            onPress={() => handleResetPassword()}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 325,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 15,
    color: 'black',
  },
});
