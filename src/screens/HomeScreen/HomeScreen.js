import { StyleSheet, Text, View,ScrollView, Image,TouchableOpacity,SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'

import PushNotification, {Importance} from 'react-native-push-notification';




const HomeScreen = ({navigation}) => {

  PushNotification.createChannel(
    {
      channelId: 'my-channel',
      channelName: 'My Channel',
      soundName: 'default',
      importance: 4,
      vibrate: true
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
 
 
  const triggerNotification = () => {
    PushNotification.localNotification({
      /* Notification options */
      title: "Selfman",
      message: `Today is ${new Date().getDate()} ${new Date().toLocaleString('en-us', { month: 'long' })} ${new Date().getFullYear()}, Current Time is ${new Date().toLocaleTimeString()}`,
      channelId: 'my-channel',
      // ...
    });
  }
 
  

 


  
  
  return (
    <SafeAreaView style={styles.container}>
      

       <TouchableOpacity style={styles.button} onPress={()=> triggerNotification()}>
        <Text style={{color:'white'}}> Send Notification</Text>
       </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:30,
    alignItems:'center',
    backgroundColor:'white',
    justifyContent:'center'
},

button: {
  backgroundColor: 'red',
  width: 170,
  height: 170,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
  borderRadius: 100,
},
 
})