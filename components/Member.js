import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Picker,
    ScrollView,
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Member extends Component {

    //Props
    //Member

    componentWillMount(){

    }

    render() {
        return(
            <View>
                <Image/>
                <Text>Name</Text>
                <Text>Email</Text>
                <Text>Role</Text>
            </View>
        );
    }


}