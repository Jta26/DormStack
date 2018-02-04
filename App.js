import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';

//Seperate Views
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import ClubStackView from './Views/ClubStackView';

firebase.initializeApp({
  apiKey: "AIzaSyAbVD9D_R1y1MVwuvXDETRAQs7VucmiCiA",
  authDomain: "club-stack.firebaseapp.com",
  databaseURL: "https://club-stack.firebaseio.com",
  projectId: "club-stack",
  storageBucket: "club-stack.appspot.com",
  messagingSenderId: "294725688831"
});


const App = StackNavigator({
  ClubStack: {
    screen: ClubStackView,
    navigationOptions: {
      header: null
    },
  Login: { 
    screen: LoginView,
    navigationOptions: {
      header: null
    } 
  },
  Register: { 
    screen: RegisterView,
    navigationOptions: {
      header: null
    }
  },
  
  }
});

export default App;