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

import Event from './Event';

const {height, width} = Dimensions.get('window');

export default class EventScroll extends Component {

    state = {
        events: [],
        eventsGoing:[]
    }

    componentWillMount() {
        var Dorm = this.props.Dorm;
        var User = this.props.User;
        var database = firebase.database();
        database.ref('school/' + User.school + '/' + Dorm.key + '/events').on('child_added', snapshot => {
            var eventsArr = this.state.events.slice();
            eventsArr.push(snapshot.val());
            this.setState({events: eventsArr});
        });

    }
    
    render() {
        
        return(
            <View>
            <Text style={styles.eventstitle}>Events:</Text>
               <ScrollView contentContainerStyle={{}} style={styles.eventsScroll}>
                 
                    {this.state.events.map(event => {
                        var isGoing = false;
                        for (user in event.going) {
                            var value = event.going[user].uid
                            if (value == this.props.User.uid) {
                                isGoing = true;
                            }
                        }
                        return(
                            <Event
                                name={event.name}
                                date={event.date}
                                description={event.description}
                                isGoing={isGoing}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderBottomWidth: 2,
        
 
    },
    eventstitle: {
        color: '#000000',
        fontSize: 17,
        fontFamily: 'fjallaone',
        textDecorationLine: 'underline',
        paddingTop: 10,
        paddingLeft: 5,
        borderBottomWidth: 3,
        borderBottomColor: '#000000',
    },
    eventsScroll: {
        height: height * .47,
        
        
    },

    event: {

    }
})