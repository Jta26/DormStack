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
import { StackNavigator } from 'react-navigation';
//Custom Components
import Register from "../components/Register";

const RegisterView = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join the ClubStack!</Text>
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior={'padding'} style={styles.register}>
                <Register
                    navigation={navigation}
                />
        </KeyboardAvoidingView>
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
    },
    title: {
        textAlign: 'center',
        fontFamily:'fjallaone',
        marginBottom: 20,
        fontSize: 40,
        color: '#000000',
    }
});
export default RegisterView;