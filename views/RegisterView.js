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

const {width, height} = Dimensions.get('window');

export default class RegisterView extends Component {
    static navigationOptions = {
        title: 'Join the DormStack',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 30,
            fontFamily: 'Fjalla One',
            
        }
    }
    render() {
        return (
            <View style={styles.container}>
    
            <ScrollView contentContainerStyle={{width: width, height: height + 100, alignItems: 'center'}}>
                <View style={{width: width - 100,}}>
                <Register
                    stye={{width: 200}}
                        navigation={this.props.navigation}
                    />

                </View>
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
        fontFamily:'Fjalla One',
        marginBottom: 20,
        fontSize: 35,
        color: '#000000',
        textDecorationLine: 'underline'
    }
});
