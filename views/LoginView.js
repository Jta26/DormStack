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
  TouchableOpacity,
  Keyboard
} from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';
//Custom Components
import Login from '../components/Login';
//Seperate Views
import RegisterView from './RegisterView';

const LoginView = ({navigation}) => {

    return(
        <View style={styles.container}>
          <View>
            <Image style={styles.logo} source={require('../img/logo2.png')}></Image>
          </View>   
          
            <View style={styles.login}>
              <Login
                navigation={navigation}
              />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    login: {
      width: 300,
    },
    logo: {
      width: 274,
      height: 260

    }
});

export default LoginView; 