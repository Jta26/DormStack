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
import HorizontalPhotoScroll from '../components/HorizontalPhotoScroll';

export default class DormView extends Component {
    //Goals for this class
    //1. Verify whether or not the User is a member of this Dorm
    //2. If they are, display the Dorm information in the form of other react components; I.E. Events; PictureSlider; MoTD; Title;
    //3. If they are not display information of the User that is Role 0 (The Resident Advisor);
    //4. The Non Verified page will display a button to join, which will forward them to another View with the Dorm and User Object as a prop.

    state = {
        User: {
            first: '', 
            last: '', 
            uid: '', 
            email: '', 
            school: ''
        }, 
        Dorm: {
            name: '', 
            id: '', 
            desc: '', 
            images: [], 
            members:[]}
        };

    componentWillMount() {
        


    }

    CheckMembership = (User, Dorm) => {
        Dorm.members.forEach(element => {
            if (User.uid == Dorm.dormId) {
                return true
            }
        });
        return false;
    }

    onMembershipValidate = (isValidated) => {
        if (isValidated) {
            this.props.navigation.navigate('Dorm');
        }
        else {
            this.props.navigation.navigate('DormPreview');
        }
    }

    render() {
        var params = this.props.navigation.state.params;
        //View Design
        //Title
        //ImgScroller
        //MoTD
        //EventsScroller
        //Options
       
        return(
            <View>
                <HorizontalPhotoScroll
                    Dorm={params.Dorm}
                    User={params.User}
                />
            </View>
        );
    }

}