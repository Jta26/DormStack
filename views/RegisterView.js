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
//Custom Components
import Register from "../components/Register";
import Title from '../components/Title';

export default class RegisterView extends Component {
    static navigationOptions = {
        title: 'Join the DormStack',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 30,
            fontFamily: 'fjallaone',
            
        }
    }
    render() {
        return (
            <View style={styles.container}>
    
            <ScrollView contentContainerStyle={{height: 2000}}>
                    <Register
                        navigation={this.props.navigation}
                    />
            </ScrollView>
            </View>
        );

    }
    
};

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    register: { 
        width: 400,
    },
    title: {
        textAlign: 'center',
        fontFamily:'fjallaone',
        marginBottom: 20,
        fontSize: 35,
        color: '#000000',
        textDecorationLine: 'underline'
    }
});
