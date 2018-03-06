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
    Dimensions,
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';

import Member from '../components/Member';

const {width, height} = Dimensions.get('window');

export default class MemberListView extends Component {
    //Responsible for showing lists of members that are passed to it
    //Props:
    //memberList
    //title
    state = {
        User: this.props.navigation.state.params.User,
        Dorm: this.props.navigation.state.params.Dorm,
        isEvent: this.props.navigation.state.params.isEvent,
        eventKey: this.props.navigation.state.params.eventKey,
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

    componentDidMount() {
        //Maps each member in the memberList to a Member.js Component
        //Determines Members from list of uid passed to it.
        var database = firebase.database();
        if (!this.state.isEvent) {
            database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/members').on('value', (snapshot) => {
                this.setState({members: []});
                var arrMem = []
                snapshot.forEach((member) => {
                    var mem = {
                        uid: member.val().uid,
                        role: member.val().role
                    }
                    arrMem.push(mem);
 
                });
                this.setState({members: arrMem});
            });

        }
        else {
            database.ref('school/' + this.state.User.school + '/' 
            + this.state.Dorm.key + '/events/' + this.state.eventKey 
            + '/going').on('value', (snapshot) => {
                this.setState({members: []});
                var arrMem = []
                snapshot.forEach((member) => {
                    var mem = {
                        uid: member.val().uid,
                        role: member.val().role
                    }
                    arrMem.push(mem);
 
                });
                this.setState({members: arrMem});
            })

        }
        

    }
    render() {
       console.log(this.state.members);
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this.state.members.map((member) => {
                        return(
                            <Member
                            style={styles.member}
                            isEvent={this.state.isEvent}
                            uid={member.uid}
                            role={member.role}
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
        flex: 1,
        alignItems: 'center'
        

    },
    member: {
        
    },
    text: {
        color: '#000000',
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        
    }

});