import {StyleSheet, Text, View, TouchableOpacity, Image,ScrollView} from 'react-native';

import React, {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';

import {auth} from '../../firebase/firebase.config';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {firebase} from '@react-native-firebase/firestore';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import BackScreen from '../components/BackScreen';


const UpdatePhoto = () => {
  const route = useRoute();

  const oldPhotoUrl = route.params.url;


  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);

  const [photoAddress, setPhotoAddress] = useState(oldPhotoUrl);

  const [button,setButton]  = useState('Update Photo');

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

  

  const updateImage = async () => {
    //

    

    try {

      // no photo selected - return 

    

      if(!photo){
        alert('No new photo selected')
        return
      }

      // find file name from link  delete data from cloud storage by its link

      const fileRef =  storage().refFromURL(oldPhotoUrl);

      if(!fileRef){
        alert('No object exists at the desired reference');
        return;
      }


      

      fileRef.delete().then(() => {
        console.log('File deleted');
      });

      setButton('Updating Photo...')

      //  upload new image to cloud storage

      const reference = storage().ref('images/' + Date.now() + image);

      const task = await reference.putFile(photoAddress);

      console.log('task', task);

      const updatedPhoturl = await reference.getDownloadURL();

      console.log('updatedPhoturl:', updatedPhoturl);

      //  update image link in firestore data array

      const uid = auth.currentUser.uid;

      //find old  downloadURL  array in firestore

      const doc = firestore().collection('photos').doc(uid);

      doc.get().then(snapshot => {

        const oldDownloadURLArray = snapshot.get('downloadURL');

        // Modify the downloadURL array

        const modifiedUrlArray = oldDownloadURLArray.map(url => {
          if (url === oldPhotoUrl) {
            return updatedPhoturl;
          }
          return url;
        });

        console.log('====================================');
        console.log('modifiedUrlArray', modifiedUrlArray);
        console.log('====================================');

        doc.set({
            downloadURL: modifiedUrlArray
          }, { merge: true });
      });

      alert('Photo Updated Successfully');

      setButton('Update Photo')

    } catch (err) {
      setButton('Update Photo')
      console.log('err:', err);
      alert('Try again Later');
    }
  };

  return (
    <>
    <BackScreen navigateScreen="PhotoScreen"/>
    <ScrollView>
    <View style={{marginTop:70, marginBottom:30}}>
      <Text style={{textAlign: 'center', fontSize: 20, margin: 10,color:'black', marginBottom:20}}>
        Update Photo
      </Text>

      <View
       style={{width: 320, height: 320, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10}}>
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

      <TouchableOpacity style={styles.button}
      onPress={() => updateImage()}
      >
        <Text style={{color: 'white'}}>{button}</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </>
  );
};

export default UpdatePhoto;

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
