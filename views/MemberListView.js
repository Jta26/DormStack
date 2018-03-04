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
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';

import Member from '../components/Member';

export default class MemberListView extends Component {
    //Responsible for showing lists of members that are passed to it
    //Props:
    //memberList
    //title
    state = {
        User: this.props.navigation.state.params.User,
        Dorm: this.props.navigation.state.params.Dorm,
        isEvent: this.props.navigation.state.params.isEvent,
        members: []
    }
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        var title = '';
        if (params.isEvent) {
            title = 'Event'
        }
        else {
            title= params.Dorm.name
        }
        return {
            title: title +  ' members', 
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 30,
                fontFamily: 'Fjalla One',
                
            }
        }
    }

    componentWillMount() {
        //Maps each member in the memberList to a Member.js Component
        //Determines Members from list of uid passed to it.
        var database = firebase.database();
        if (!this.state.isEvent) {
            database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/members').on('value', (snapshot) => {
                snapshot.forEach((member) => {
                    var memArr = this.state.members.slice();
                    memArr.push(member);
                    this.setState({members: memArr});
                });
            });

        }
        else {

        }
        

    }
    render() {
        return(
            <View>
                <ScrollView contentContainerStyle={styles.container}>
                    {this.state.members.map((member) => {
                        return(
                            <Member
                            style={styles.member}
                            isEvent={this.state.isEvent}
                            uid={member.val().uid}
                            role={member.val().role}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems:'center',
       

    },
    member: {
        width: 350
    },
    text: {
        color: '#000000',
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        
    }

});