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
        var database = firebase.database();
        var User = this.props.User;
        var Dorm = this.props.Dorm;
        database.ref('school/' + User.school + '/' + Dorm.key + '/images').orderByKey().limitToFirst(1)
        .once('value', (snapshot) => {
            snapshot.forEach(child => {
                storage.ref(child.val().url).getDownloadURL().then(url => {
                    this.setState({url: url});
                })
            })
        })
        
   
    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.navigation.navigate('Dorm', {Dorm: this.props.Dorm, User: this.props.User})
                }}>
                    <Image source={{uri: this.state.url}} style={styles.image}/>
                    <Text style={styles.text}>{this.props.Dorm.name}</Text>
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
        marginRight: 10
    },
    text: {
        color: '#000000',
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'fjallaone',
        width: 150
    }
});