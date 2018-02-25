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
        var eventsArr;
        var database = firebase.database();
        database.ref('school/' + User.school + '/' + Dorm.key + '/events').on('value', snapshot => {
            snapshot.forEach(events => {
                eventsArr = this.state.events.slice();
                eventsArr.push(events);
                this.setState({events: eventsArr});
            })
        });

    }


    
    render() {
        
        return(
            <View>
            <Text style={styles.eventstitle}>Events:</Text>
               <ScrollView contentContainerStyle={{}} style={styles.eventsScroll}>
                 
                    {this.state.events.map(event => {
                        var isGoing = false;
                        var eventkey= event.key;
                        for (user in event.val().going) {
                            var value = event.val().going[user].uid
                            if (value == this.props.User.uid) {
                                isGoing = true; 
                            }
                            
                            
                        }

                        return(
                            <Event
                                Dorm={this.props.Dorm}
                                User={this.props.User}
                                name={event.val().name}
                                date={event.val().date}
                                description={event.val().description}
                                isGoing={isGoing}
                                eventKey={event.key}
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
        
 
    },
    eventstitle: {
        color: '#000000',
        fontSize: 17,
        fontFamily: 'fjallaone',
        paddingTop: 10,
        paddingLeft: 5,
        backgroundColor: '#ffffff',
        elevation: 5
    },
    eventsScroll: {
        height: height * .47,
        
        
    },

    event: {

    }
})