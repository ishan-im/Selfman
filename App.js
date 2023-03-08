/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './src/screens/SignInScreen/SignInScreen';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

import SignUpScreen from './src/screens/SignupScreen/SignUpScreen';

import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

import SplashScreen from './src/screens/SplashScreen/SplashScreen';

import UpdateProfile from './src/screens/ProfileScreen/UpdateProfile';

import AddPhotos from './src/services/AddPhotos';

import MyTabs from './src/tab/Tab';

import MainScreen from './src/screens/MainScreen/MainScreen';

import CreateText from './src/services/CreateText';

import UpdatePhoto from './src/services/UpdatePhoto';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MyTabs>" component={MyTabs} />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen name="AddPhotos" component={AddPhotos} />
            <Stack.Screen name="CreateText" component={CreateText} />
            <Stack.Screen name="UpdatePhoto" component={UpdatePhoto} />
          </Stack.Navigator>
        </NavigationContainer>
     
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    margin: 20,
    fontSize: 24,

    fontWeight: '600',
    color: Colors.dark,
  },
});

export default App;
