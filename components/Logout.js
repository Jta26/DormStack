import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';


export default class Logout extends Component {
    onLogoutPress = () => {
        firebase.auth().signOut()
        .then(() => {
            alert('Account Successfully Logged Out');
            this.props.navigation.navigate('Login');
        })
        .catch(() => {
            
        });
        
    }

    render() {
        return(
            <View>
                <TouchableOpacity onPress={this.onLogoutPress.bind('this')} style={styles.button}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 30,
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontFamily: 'fjallaone',
        color: '#000000'
    }
});