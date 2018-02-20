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
  Dimensions
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';


export default class Title extends Component {

    render() {
        return(
            <View>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontFamily:'fjallaone',
        margin: 10,
        fontSize: 40,
        color: '#000000',
    }
    
});