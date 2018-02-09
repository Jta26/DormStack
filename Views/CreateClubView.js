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

import CreateClub from '../components/CreateClub'


const CreateClubView = ({navigation}) => {

    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Start a New Club!</Text>
            
            <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={'padding'} style={styles.createclub}>
                <CreateClub 
                navigation={navigation}
                />
            </KeyboardAvoidingView>
            <Text>Hint: You will be the president :)</Text>
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
    createclub: {
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

export default CreateClubView