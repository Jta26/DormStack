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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';
//Custom Components
import Login from '../components/Login';
//Seperate Views
import RegisterView from './RegisterView';

const LoginView = ({navigation}) => {
    return(
        <View style={styles.container}>   
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
      
      
    }
});

export default LoginView; 