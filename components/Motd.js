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

export default class Motd extends Component {
    
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.motdtitle}>Message of the Day:</Text>
                <Text style={styles.motd}>{this.props.motd}</Text>
            </View>
        );
    }




}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        padding: 10
    },
    motdtitle: {
        color: '#000000',
        fontSize: 17,
        fontFamily: 'fjallaone',
        textDecorationLine: 'underline'
        
    },
    motd: {
        color: '#000000',
        fontSize: 15,
        fontFamily: 'fjallaone',


    }
});