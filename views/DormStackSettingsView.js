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

import Logout from '../components/Logout';
import Member from '../components/Member';

import DormStackView from '../views/DormStackView';




export default class DormStackSettingsView extends Component {

    static navigationOptions = ({ navigation }) => {

        const {params} = navigation.state;

        return {
            title: 'User Settings',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 20,
                fontFamily: 'fjallaone',       
            }
        }
    } 
    render() {
        return(

            <View style={{alignItems: 'center'}}>
               <Member
                style={{ width: 350}}
                uid={firebase.auth().currentUser.uid}
               />
                <Logout
                    style={{width: 200}}
                    navigation={this.props.navigation}
                />
            </View>






        )
    }
}