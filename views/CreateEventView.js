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
  TouchableOpacity,
  Picker
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

import CreateEvent from '../components/CreateEvent';

export default class CreateEventView extends Component {


    render() {
        return(
            <CreateEvent
                navigation={this.props.navigation}
            />
        )
    }
}