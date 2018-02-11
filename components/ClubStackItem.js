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

export default class ClubStackitem extends Component {
    //props ClubImage, ClubTitle
    componentWillMount() {

    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../img/clubtestimg.png')} style={styles.image}/>
                    <Text style={styles.text}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'red'
    },
    button: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        
    },
    image: {
        width: 75,
        height: 75,
    },
    text: {
        color: '#ffffff',
        textShadowColor: '#000000',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'fjallaone',
        width: 150
    }
});