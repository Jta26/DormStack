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

export default class DormStackOptions extends Component {

    onCreateDormPress = () => {
        this.props.navigation.navigate('CreateDorm');
    }
    onDormStackSettingsPress = () => {
        this.props.navigation.navigate('DormStackSettings');
    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.settings} onPress={this.onDormStackSettingsPress.bind(this)}>
                    <Image source={require('../img/settings.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.onCreateDormPress.bind(this)}>
                    <Text style={styles.text}>Add a Dorm!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10
    },
    settings: {
        width: 100,
        height: 50,
    
    },
    button: {
        width: 250,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
     
        
    },
    text: {
        fontSize: 25,
        fontFamily: 'Fjalla One3',
        color: '#000000',
        textAlign: 'center'
        
    },
});