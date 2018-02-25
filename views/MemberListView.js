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

import Member from '../components/Member';

export default class MemberListView extends Component {
    //Responsible for showing lists of members that are passed to it
    //Props:
    //memberList
    //title

    componentWillMount() {
        //Maps each member in the memberList to a Member.js Component
        //Determines Members from list of uid passed to it.
    }
    

    render() {
        return(
            <View>
                {this.props.memberList.map(() => {
                    return(
                        <Member
                        //propshere
                        />
                    );
                })}
            </View>
        );
    }


}