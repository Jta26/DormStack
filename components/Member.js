import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Picker,
    ScrollView,
    Image
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';
import { database } from 'firebase';

export default class Member extends Component {

    //Props
    //Member
    state={uid: this.props.uid, first: '', last: '', email: '', role: '', profilepicURL: ''}

    componentWillMount(){
        this.GetMemberData(this.state.uid);
        this.DetermineRole();
    }

    GetMemberData = (uid) => {
        var database = firebase.database();
        var userRef = database.ref('users/' + uid);
        userRef.on('value', (snapshot) => {
            this.setState({
                first: snapshot.val().firstname,
                last: snapshot.val().lastname,
                email: snapshot.val().email,
            });
            this.SetProfilePic(snapshot.val().profilepic)
        });
    }
    SetProfilePic = (profilePic) => {
        var storage = firebase.storage();
        var picRef = storage.ref(profilePic);
        picRef.getDownloadURL().then((url) => {
            this.setState({
                profilepicURL: url
            });
        });
    }
    DetermineRole = () => {
        if (this.props.role == 0 && this.props.isEvent) {
            this.setState({role: 'Event Organizer'});
        }
        else if (this.props.role == 0 && !this.props.isEvent) {
            this.setState({role: 'Resident Advisor'});
        }
        else {
            this.setState({role: 'resident'});
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Image style={{width: 100, height: 100}} source={{uri: this.state.profilepicURL}}/>
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.text}>{this.state.first} {this.state.last}</Text>
                <Text style={styles.text}>{this.state.email}</Text>
                <Text style={styles.text}>{this.state.role}</Text>
                </View>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        width: 300,
        
        flexDirection: 'row',

    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'fjallaone',  
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    

})