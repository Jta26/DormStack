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

export default class DormStackitem extends Component {
    //props DormImage, DormTitle
    componentWillMount() {

    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Image source={{uri: 'data:image/jpg;base64,' + this.props.image}} style={styles.image}/>
                    <Text style={styles.text}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: '#cdb87d',
        height: 75
    },
    button: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        
    },
    image: {
        width: 65,
        height: 65,
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