import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

import {
  auth,
  onAuthStateChangedListener,
} from '../../../firebase/firebase.config';

const SplashScreen = ({navigation}) => {

  
  useEffect(() => {
    setTimeout(() => {
      onAuthStateChangedListener(user => {
        if (user) {
          // User is signed in, see docs for a list of available properties

          navigation.navigate('Main');
        }else{
          navigation.navigate('SignIn');
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../../assets/superman.png')}
        style={styles.icon}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2645BD',
  },

  logo: {
    fontSize: 50,
    color: 'blue',
  },

  icon: {
    width: 180,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
