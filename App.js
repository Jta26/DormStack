/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator} from 'react-navigation';
import firebase from 'firebase';

//Custom Views
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import CreateDormView from './views/CreateDormView'
import DormStackView from './views/DormStackView'

firebase.initializeApp({
  apiKey: "AIzaSyAbVD9D_R1y1MVwuvXDETRAQs7VucmiCiA",
  authDomain: "club-stack.firebaseapp.com",
  databaseURL: "https://club-stack.firebaseio.com",
  projectId: "club-stack",
  storageBucket: "club-stack.appspot.com",
  messagingSenderId: "294725688831"
});


const App = StackNavigator({

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
  CreateDorm: {
    screen: CreateDormView,
    navigationOptions: {
      header: null
    }
  },
  DormStack: {
    screen: DormStackView,
    navigationOptions: {
      header: null
    },
  
  }
});

export default App
