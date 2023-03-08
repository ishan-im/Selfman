import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {auth} from '../../../firebase/firebase.config';

import firestore from '@react-native-firebase/firestore';

const TextScreen = ({navigation}) => {
  const [text, setText] = useState(null);

  const user = auth.currentUser;
  const uid = user.uid;

  const getUserText = async () => {
    const data = await firestore()
      .collection('text')
      .doc(uid)
      .get()
      .then(documentSnapshot => {
        console.log('Text exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('Text: ', documentSnapshot.data());
          setText(documentSnapshot.data().text);
        }
      });
  };
  

  useEffect(() => {
    const unsubscribe = firestore()
    .collection('text')
    .doc(uid)
    .onSnapshot(snapshot => {
      if (snapshot.exists) {
        console.log('Text: ', snapshot.data());
        setText(snapshot.data().text);
      }
    });

  return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {text &&
          text.map((text, index) => <TextCard text={text} key={index}/>)}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateText')}>
        <Text style={{color: 'white'}}>Add Text</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'white',
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
  },

  textContainer: {
    backgroundColor: '#D6E4F0',
    width: 340,
    height: 340,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    padding:15
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },


});

const TextCard = ({text}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
