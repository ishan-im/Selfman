import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

const BackScreen = ({navigateScreen}) => {

    const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate(navigateScreen)}
    style={styles.button}
    >
      <Icon name="arrow-back-ios" size={33} style={{color:'black'}} />

    </TouchableOpacity>
  );
};

export default BackScreen;

const styles = StyleSheet.create({
    button:{
        position:'absolute',
        left:30,
        top:30,
        zIndex:1,
        width:50,
        height:50,
        borderRadius:50,
       
    }
});
