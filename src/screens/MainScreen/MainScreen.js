import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'




import MyTabs from '../../tab/Tab'

const MainScreen = ({navigation}) => {


return (
    <View style={{flex:1}}>
      
        <MyTabs/>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({})