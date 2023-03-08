import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';

import React, {useEffect, useState} from 'react';

import {auth} from '../../firebase/firebase.config';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { firebase } from '@react-native-firebase/firestore';

import firestore from '@react-native-firebase/firestore';

import BackScreen from '../components/BackScreen';


import storage from '@react-native-firebase/storage';

const AddPhotos = ({navigation}) => {
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);

  const [photoAddress, setPhotoAddress] = useState(null);

  const [downLoadURL, setDownloadURL] = useState([]);

  const [button,setButton]  = useState('Upload Photo');


  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        
      },
      response => {
        console.log('response', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
          setPhotoAddress(response.assets[0].uri);
          setImage(response.assets[0].fileName);
        }
      },
    );
  };

  const handleOpenGalery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
     
      },
      response => {
        console.log('response', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          setPhoto(source);
          setPhotoAddress(response.assets[0].uri);
          setImage(response.assets[0].fileName);
        }
      },
    );
  };

  const reference = storage().ref('images/' + Date.now() + image);

  const handleUploadImage = async () => {

    try {

      setButton('Uploading Photo...')

      const task = await reference.putFile(photoAddress);
      console.log("task",task);
      const url = await reference.getDownloadURL();
      console.log(url);

      setDownloadURL([url]);


      const user = auth.currentUser;
      const uid = user.uid;

      const doc = {
        downloadURL: [url],
      };

      

      
      const data = await firestore()
      .collection('photos')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        console.log('User photo exists: ', documentSnapshot.exists);
    
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
            
        const res =  firestore().collection('photos').doc(uid).update({
            downloadURL: firebase.firestore.FieldValue.arrayUnion(url)
          });

          console.log('Document written with ID: ', res);

          alert('Photo added successfully')

          setButton('Upload Photo')

        }else{

            const docRef =  firestore().collection('photos').doc(uid).set(doc);

            alert('Photo added successfully')

            setButton('Upload Photo')


            console.log('Document written with ID: ', docRef);
        }
      })

      

      
    } catch (e) {
      console.log(e);
      alert('Something went wrong');
    }
  };

  return (
    <>
    <BackScreen navigateScreen="PhotoScreen"/>
    <ScrollView>
      <SafeAreaView>
        
    <View style={{marginTop:80, marginBottom:40}}>
      <Text style={{textAlign: 'center', fontSize: 20, margin: 10,color:'black'}}>
        Add Photos
      </Text>

      <View
        style={{width: 320, height: 320, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10
       }}>
        <Image
          source={{uri: `${photoAddress}`}}
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOpenCamera()}>
          <Text style={{color: 'white'}}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOpenGalery()}>
          <Text style={{color: 'white'}}>Open Galery</Text>
        </TouchableOpacity>
      </View>

      {photoAddress && (
        <View style={{marginBottom:40}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUploadImage()}>
          <Text style={{color: 'white'}}>{button}</Text>
        </TouchableOpacity>
        </View>
      )}
    </View>
    </SafeAreaView>
    </ScrollView>
    </>
  );
};

export default AddPhotos;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2645BD',
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
