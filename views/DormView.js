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

import HorizontalPhotoScroll from '../components/HorizontalPhotoScroll';
import Title from '../components/Title';
import Motd from '../components/Motd';
import EventScroll from '../components/EventScroll';
import QRCodeScanner from 'react-native-qrcode-scanner';


const {height, width} = Dimensions.get('window');

export default class DormView extends Component {
    //Goals for this class
    //1. Verify whether or not the User is a member of this Dorm
    //2. If they are, display the Dorm information in the form of other react components; I.E. Events; PictureSlider; MoTD; Title;
    //3. If they are not display information of the User that is Role 0 (The Resident Advisor);
    //4. The Non Verified page will display a button to join, which will forward them to another View with the Dorm and User Object as a prop.

    state = {
        Dorm: this.props.navigation.state.params.Dorm,
        User: this.props.navigation.state.params.User,
        DormMembers: '',
        isValidated: false
    }

    static navigationOptions = ({ navigation }) => {

        const {params} = navigation.state;

        return {
            title: params.Dorm.name,
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 30,
                fontFamily: 'fjallaone',       
            }
        }
    }   
    componentWillMount() {
       var database = firebase.database();
       database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/members')
       .once('value', (snapshot => {
            snapshot.forEach((member) => {
               
                if (this.CheckMembership(this.state.User, member.val().uid)) {
                    this.setState({isValidated: true});
                }  
            });
            

       }));
    }
    CheckMembership = (User, uid) => {
        if (User.uid == uid) {
            return true;
        }
        else {
            return false
        }
    }
    onMembershipValidate = () => {

        if (this.state.isValidated) {
            return (
                <View>

                    <HorizontalPhotoScroll
                        style={styles.photoScroll}
                        Dorm={this.state.Dorm}
                        User={this.state.User}
                        navigation={this.props.navigation}
                    />
                    <Motd
                        style={styles.Motd}
                        motd={this.state.Dorm.motd}
                    />
                    <EventScroll
                        style={styles.eventScroll}
                        Dorm={this.state.Dorm}
                        User={this.state.User}
                        navigation={this.props.navigation}
                        events={[]}
                    />
                </View>
            );
        }
        else {
           
        }
    }
    render() {
        //View Design
        //Title
        //ImgScroller
        //MoTD
        //EventsScroller
        //Options
       
        return(
            <View style={styles.container}>
                    
                {this.onMembershipValidate()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        backgroundColor: '#ffffff',
        
    },
    motd: {
        borderColor: '#000000',
        borderWidth: 3,
        height: height / 6
    },
    photoScroll: {
        
    },
    eventScroll: {
      
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 20,
        height: 35,
        width: 200,
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