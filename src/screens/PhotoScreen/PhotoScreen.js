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

import {auth} from '../../../firebase/firebase.config';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';

const PhotoScreen = ({navigation}) => {
  const [photo, setPhoto] = useState(null);

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('photos')
      .doc(uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          console.log('Text: ', snapshot.data());
          setPhoto(snapshot.data().downloadURL);
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.scrollCOntainer}>
        {photo != undefined
          ? photo.map((url, index) => <ImageCard url={url} key={index} />)
          : null}
      
      </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddPhotos')}>
        <Text style={{color: 'white'}}>Add Photos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  scrollCOntainer:{
    marginTop:30
  },

  button: {
    backgroundColor: '#2645BD',
    width: 150,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom:40
  },

  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    paddingTop:10,

  },

  imageContainer: {
    width: 340,
    height: 380,
    backgroundColor: '#D6E4F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
});

const ImageCard = ({url}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UpdatePhoto', {
            url: url,
          })
        }>
        <Icon name="edit" size={25} color="black" />
      </TouchableOpacity>

      <Image source={{uri: url}} style={styles.image} />
    </View>
  );
};
