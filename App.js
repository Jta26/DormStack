// * DormStack *
//Created by Joel Austin
//2018 Pitt Mobile App Challenge
//https://github.com/Jta26/DormStack

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
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import CreateDormView from './views/CreateDormView';
import DormStackView from './views/DormStackView';
import DormView from './views/DormView';
import DormStackSettingsView from './views/DormStackSettingsView';
import AddDormImageView from './views/AddDormImageView'
import CreateEventView from './views/CreateEventView';
import ImageView from './views/ImageView';

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
    }
  },
  Dorm: {
    screen: DormView,
    navigationOptions: {
      header: null
    }
  },
  Image: {
    screen: ImageView,
    navigationOptions: {
      header: null
    }
  },
  AddImage: {
    screen: AddDormImageView,
    navigationOptions: {
      header: null
    }
  },
  CreateEvent: {
    screen: CreateEventView,
    navigationOptions: {
      header: null
    }
  },
  DormStackSettings: {
    screen: DormStackSettingsView,
    navigationOptions: {
      header: null
    }
  },

});

export default App
