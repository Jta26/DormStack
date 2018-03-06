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
            <Text style={styles.title}>Add a Dorm to Your School's DormStack</Text>
            <View style={styles.createDorm}>
                <CreateDorm 
                navigation={navigation}
                />
            </View>
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
        fontFamily:'Fjalla One',
        marginBottom: 20,
        fontSize: 40,
        color: '#000000',
    }
});

export default CreateDormView;