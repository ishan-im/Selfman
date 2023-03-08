import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';

import {
  auth,
  onAuthStateChangedListener,
} from '../../../firebase/firebase.config';
import BackScreen from '../../components/BackScreen';

const UpdateProfile = () => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const [profile, setProfile] = useState(null);

  const [button, setButton] = useState('Update Profile');

  const user = auth.currentUser;
  const uid = user.uid;

  const getUserProfile = async () => {
    const data = await firestore().collection('users').doc(uid).get();

    console.log(data.data());

    setProfile(data.data());
    setName(data.data()?.displayName);
    setPhone(data.data()?.phone);
    setAddress(data.data()?.address);
  };

  useEffect(() => {
    getUserProfile();
  }, [uid]);

  const handleUpdateProfile = async () => {
    setButton('Updating Profile...');

    const data = await firestore()
      .collection('users')
      .doc(uid)
      .update({
        displayName: name,
        phone: phone,
        address: address,
      })
      .then(() => {
        alert('User updated!');
      });

    setButton('Update Profile');
  };

  return (
    <>
    <BackScreen navigateScreen="ProfileScreen" />
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={styles.container}>
        <View >
          
          <View style={{marginTop: 70}}>
          <View>
            <Text style={styles.title}>Update Profile</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode="outlined"
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Name"
              placeholderTextColor="#000"
            />

            <TextInput
              label="Phone Number"
              style={styles.input}
              mode="outlined"
              onChangeText={text => setPhone(text)}
              value={phone}
              placeholder="Phone Number"
              placeholderTextColor="#000"
            />

            <TextInput
              label="Address"
              style={styles.input}
              mode="outlined"
              onChangeText={text => setAddress(text)}
              value={address}
              placeholder="Address"
              placeholderTextColor="#000"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpdateProfile()}>
              <Text style={{color: 'white', fontSize: 20}}>{button}</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    paddingVertical: 8,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  inputContainer: {
    marginTop: 30,
  },

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

  button: {
    backgroundColor: '#2645BD',
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    marginBottom:50
  },
});
