import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedbackComponent,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PhotoScreen from '../screens/PhotoScreen/PhotoScreen';

import CalculatorScreen from '../screens/CalculatorScreen/CalculatorScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Icons from 'react-native-vector-icons/FontAwesome5';

import TextScreen from '../screens/TextScreen/TextScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        
        options={{
          
          headerShown: false,
          
          tabBarIcon: tabInfo => {
            return (
              <Icons
                name="home"
                size={25}
                color={tabInfo.focused ? '#2645BD' : 'black'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="PhotoScreen"
        component={PhotoScreen}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Icon
                name="add-a-photo"
                size={30}
                color={tabInfo.focused ? '#2645BD' : 'black'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TextScreen"
        component={TextScreen}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Icons
                name="pencil-alt"
                size={25}
                color={tabInfo.focused ? '#2645BD' : 'black'}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Icons
                name="calculator"
                size={25}
                color={tabInfo.focused ? '#2645BD' : 'black'}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Icons
                name="user-alt"
                size={25}
                color={tabInfo.focused ? '#2645BD' : 'black'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;


