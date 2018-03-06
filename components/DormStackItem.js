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

    componentDidMount() {
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
                    <View>
                        <Text style={styles.dormTitle}>{this.props.Dorm.name}</Text>
                        <Text style={styles.text}>{this.props.Dorm.desc}</Text>
                    </View>

                </TouchableOpacity>
            </View>
            
        );
    }

}
const styles = StyleSheet.create({
    container: {
        height: 100,
    },
    button: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#000000'
    },
    dormTitle: {
        color: '#000000',
        textShadowRadius: 2,
        textDecorationLine: 'underline',
        fontSize: 25,
        fontFamily: 'Fjalla One',
        width: 150
    },
    text: {
        color: '#000000',
        textShadowRadius: 2,
        fontSize: 15,
        fontFamily: 'Fjalla One',
        width: 200
    }
});