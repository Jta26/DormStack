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
import { StackNavigator } from 'react-navigation';
//Custom Components
import Register from "../components/Register";
//Seperate Views

const RegisterView = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={require('../img/logo.png')}></Image>
            <View style={styles.register}>
                <Register
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
    register: {
      width: 300,
    }
});
export default RegisterView;