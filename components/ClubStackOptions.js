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

export default class ClubStackOptions extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.settings}>
                    <Image source={require('../img/settings.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Start a Club!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20
    },
    settings: {
        width: 100,
        height: 50,
        marginBottom: 75
        

    },
    button: {
        width: 350,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        marginBottom: 70       
        
    },
    text: {
        fontSize: 25,
        fontFamily: 'fjallaone',
        color: '#000000',
        textAlign: 'center'
        
    },
});