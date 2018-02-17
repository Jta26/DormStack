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

    state = {url: ''}

    componentWillMount() {
        var storage = firebase.storage();

        storage.ref(this.props.image).getDownloadURL().then((url) => {
            this.setState({url: url});
        });
    }
    CheckMembership = () => {
        
    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Image source={{uri: this.state.url}} style={styles.image}/>
                    <Text style={styles.text}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        height: 75,
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
        color: '#000000',
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'fjallaone',
        width: 150
    }
});