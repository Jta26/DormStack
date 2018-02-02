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

export default class ClubStackOptions extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.settings}>
                    <Image source={require('../img/settings.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>Start a Club!</Text>
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
        justifyContent: 'center'

    },
    settings: {
        width: 40,
        height: 40,

    },
    button: {
        width: 300,
        
    }
});