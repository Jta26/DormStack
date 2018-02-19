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
import DisplayUser from '../components/DisplayUser';

import DormStackView from '../views/DormStackView';




export default class DormStackSettingsView extends Component {

    render() {
        return(

            <View>
                <DisplayUser/>
                <Logout
                    navigation={this.props.navigation}
                />
            </View>






        )
    }





}