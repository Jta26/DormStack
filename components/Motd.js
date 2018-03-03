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
    Dimensions
  } from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

const {height, width} = Dimensions.get('window');

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
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 1.00,
        height: height * .1,
       
    },
    motdtitle: {
        color: '#000000',
        fontSize: 17,
        fontFamily: 'Fjalla One',
        marginTop: 5,
        marginLeft: 5
    },
    motd: {
        color: '#000000',
        fontSize: 15,
        fontFamily: 'Fjalla One',
        marginLeft: 10


    }
});