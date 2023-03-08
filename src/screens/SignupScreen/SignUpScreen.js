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
import React, {useState} from 'react';



import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

import firestore from '@react-native-firebase/firestore';

import {auth} from '../../../firebase/firebase.config';
import BackScreen from '../../components/BackScreen';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [name, setName] = useState(null);

  const [button, setButton] = useState('Sign Up');

  const handleSignUp = async () => {
    try {
      if (!name) {
        alert('Please enter your name');
        return;
      }

      if (!email) {
        alert('Please enter your email');
        return;
      }

      if (!password) {
        alert('Please enter your password');
        return;
      }

      // regex to check strong password
      const strongPasswordRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
      );

      if (!strongPasswordRegex.test(password)) {
        alert(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character',
        );
        return;
      }

      //check temporary or invalid email firebase

      const emailRegex = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
      );

      if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
      }

      // Check the sign-in methods for the email address
      // const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      // if (signInMethods.length > 0) {
      //   alert('The email address is already exists');
      //   return;
      // }

      // Create a user with email and password


        setButton('Signing Up...');
      

      const {user} = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log(user);

      const doc = {
        displayName: name,
        email: email,
        password: password,
        uid: user.uid,
      };

      const docRef = await firestore()
        .collection('users')
        .doc(user.uid)
        .set(doc);

      // console.log('Document written with ID: ', docRef.id);

      return navigation.navigate('Main');

      setButton('Sign Up');
      
    } catch (error) {

      setButton('Sign Up');

      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
        alert('Cannot sign up now :(');
      }
    }
  };

  return (
    <ScrollView>
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        marginTop:50
      }}>
      <View>
        <Image
          source={require('./../../../assets/superman.png')}
          style={{width: 140, height: 110, marginTop: 20}}
        />
        <Text style={{fontSize: 30, marginVertical: 10, color: 'black'}}>
          Sign Up Here
        </Text>
      </View>

      <View>
        <TextInput
          label="Name"
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Name"
          placeholderTextColor="#000"
        />
        <TextInput
          label="Email"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
          placeholderTextColor="#000"
        />
        <TextInput
          label="Password"
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
          marginBottom:40
        }}>
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
          onPress={() => handleSignUp()}>
          <Text style={{color: '#ffffff'}}>{button}</Text>
        </TouchableOpacity>
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
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={{color: '#ffffff'}}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;

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
