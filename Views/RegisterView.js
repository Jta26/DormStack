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

const RegisterView = ({navigation}) => {
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={'padding'} style={styles.container}>
            <Text style={styles.title}>Join the ClubStack!</Text>
            <View style={styles.register}>
                <Register
                    navigation={navigation}
                />
            </View>
            
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
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