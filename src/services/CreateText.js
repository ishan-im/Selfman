import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useState} from 'react';

import {auth} from '../../firebase/firebase.config';

import {firebase} from '@react-native-firebase/firestore';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import BackScreen from '../components/BackScreen';



const CreateText = () => {

  const [text, setText] = useState(null);

  const [userText, setUserText] = useState([]);

  const [button, setButton] = useState('Add Text');
  

useEffect(() => {

  setUserText((prev) => [...prev, text]); 
  setText(null);
  
  }, [])


  const handleText = async () => {
    try {

       

 // regex to check if text is empty and alert user

      if (text === null || text === '' || text.trim() === '') {
        alert('Please enter text');
        return; 
      }

        
       


      setButton('Adding Text...');
      console.log(userText);
      const user = auth.currentUser;
      const uid = user.uid;

      const data = {
        text: [text],
      };

      const res = await firestore()
        .collection('text')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          console.log('Collection text exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            console.log('Collection text: ', documentSnapshot.data());

            const res = firestore()
              .collection('text')
              .doc(uid)
              .update({
                text: firebase.firestore.FieldValue.arrayUnion(text)
              });

            console.log('Document written with ID: ', res);

            alert('text added successfully');
          } else {
            const docRef = firestore().collection('text').doc(uid).set(data);
          alert('text added successfully');
            console.log('Document written with ID: ', docRef);
          }
        });

        setButton('Add Text');
        setUserText([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <BackScreen navigateScreen="TextScreen"/>
    <SafeAreaView style={styles.container}>
      
      <View>
        <Text style={{fontSize:20, color:'black',fontWeight:'600',marginBottom:30}}>CreateText</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(text)=>setText(text)}
        value={text} 
        placeholder="Enter text"
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={styles.button} onPress={() => handleText()}>
        <Text style={{color: 'white'}}>{button}</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  );
};

export default CreateText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    height: 60,
    width: 325,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    fontSize:20,
    padding:15,
    color:'black'
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
});
