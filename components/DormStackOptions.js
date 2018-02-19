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
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        
    },
    settings: {
        width: 100,
        height: 50,
        marginBottom: 75
        

    },
    button: {
        width: 250,
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