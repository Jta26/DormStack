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




export default class DisplayUser extends Component {

    state = {User: {first: '', last: '', email: '', uid: '', school:''}}

    componentDidMount() {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(snapshot => {
            this.setState({
                User: {
                    first: snapshot.val().firstname,
                    last: snapshot.val().lastname,
                    email: snapshot.val().email,
                    uid: firebase.auth().currentUser.uid,
                    school: snapshot.val().campus
                }
            });
        });
    }
    
    render() {
        return(
            <View>
                <Text>Name: {this.state.User.first} {this.state.User.last}</Text>
                <Text>Email: {this.state.User.email}</Text>
                <Text>School: {this.state.User.school}</Text>
                <Text>User ID: {this.state.User.uid}</Text>

            </View>



        );
    }
}