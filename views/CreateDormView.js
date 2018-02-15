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
  Picker
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

import CreateDorm from '../components/CreateDorm'


const CreateDormView = ({navigation}) => {

    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Section for Your Schools Dorm!</Text>
            
            <KeyboardAvoidingView keyboardVerticalOffset={250} behavior={'height'} style={styles.createDorm}>
                <CreateDorm 
                navigation={navigation}
                />
            </KeyboardAvoidingView>
            <Text>Hint: You will be the Resident Advisor :)</Text>
        </View>
    )
     
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    createDorm: {
        width: 300
    },
    title: {
        textAlign: 'center',
        fontFamily:'fjallaone',
        marginBottom: 20,
        fontSize: 40,
        color: '#000000',
    }
});

export default CreateDormView;