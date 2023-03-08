import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';

import {signOut} from 'firebase/auth';

import Icon from 'react-native-vector-icons/MaterialIcons';


import {
  auth,
  onAuthStateChangedListener,
} from '../../../firebase/firebase.config';
import {add} from 'react-native-reanimated';

const ProfileScreen = ({navigation}) => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);

  const [profile, setProfile] = useState(null);

  const user = auth.currentUser;
  const uid = user.uid;

 
  //   const data = await firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .get()
  //     .then(documentSnapshot => {
  //       console.log('User exists: ', documentSnapshot.exists);

  //       if (documentSnapshot.exists) {
  //         console.log('User data: ', documentSnapshot.data());
  //         setProfile(documentSnapshot.data());
  //         setName(documentSnapshot.data()?.displayName);
  //         setPhone(documentSnapshot.data()?.phone);
  //         setAddress(documentSnapshot.data()?.address);
  //         setEmail(documentSnapshot.data()?.email);
  //       }
  //     });
  // };

  useEffect(() => {
     const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          console.log('User: ', snapshot.data());
           setProfile(snapshot.data());
          setName(snapshot.data()?.displayName);
          setPhone(snapshot.data()?.phone);
          setAddress(snapshot.data()?.address);
          setEmail(snapshot.data()?.email);
        }
      });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
       
        navigation.replace('SignIn');
      })
      .catch(error => {
        // An error happened.
        alert(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View>
        <Image
          source={{
            uri: 'https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w480-h960-rw',
          }}
          style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.text}>Name</Text>
        <View style={styles.textContainer}>
          <Text style={styles.containerText}>{name}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.text}>Email</Text>
        <View style={styles.textContainer}>
          <Text style={styles.containerText}>{email}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Address</Text>
        <View style={styles.textContainer}>
          <Text style={styles.containerText}>{address}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.text}>Phone Number</Text>
        <View style={styles.textContainer}>
          <Text style={styles.containerText}>{phone}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UpdateProfile')}>
          <Text style={{color: 'white', fontSize: 20}}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => logOut()} style={styles.button2}>
          <Text style={{color: 'white', fontSize: 20, marginRight:10}}>
            Sign Out {` `}
            <Icon name="logout" size={20} color="white"/>
          </Text>
          
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
   
  },

  title: {
    marginTop: 16,
    paddingVertical: 8,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  button: {
    backgroundColor: '#2645BD',
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal:10,
    borderRadius: 10,
  },

  button2:{
    backgroundColor: 'gray',
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal:5,
    borderRadius: 10,
  },

  image: {width: 100, height: 100, borderRadius: 50, alignSelf: 'center'},

  text: {
    fontSize: 13,
    fontWeight: '400',
    color: 'gray',
    marginHorizontal: 30,
    marginVertical: 5,
  },

  textContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    elevation: 1,
    height: 40,
  },

  containerText: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});
