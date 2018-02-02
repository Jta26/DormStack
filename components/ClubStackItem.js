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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

export default class ClubStackitem extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        borderColor: 'red',
        borderWidth: 5
    }
        
})