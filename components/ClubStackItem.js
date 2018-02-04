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

export default class ClubStackitem extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../img/clubtestimg.png')} style={styles.image}/>
                    <Text style={styles.text}>I.T. Club</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        
    },
    image: {
        width: 75,
        height: 75,
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'fjallaone'
    }
});