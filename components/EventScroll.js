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
    }
    

    componentWillMount() {
        var Dorm = this.props.Dorm;
        var User = this.props.User;
        var database = firebase.database();
       
        
        database.ref('school/' + User.school + '/' + Dorm.key + '/events').once('value', snapshot => {
           this.setState({events: []});
            snapshot.forEach((event) => {
                this.setState({events: [...this.state.events, event]});
            });
            
        });
        

    }

    render() {
        var events = this.state.events;
        return(
            <View>
            <Text style={styles.eventstitle}>Events:</Text>
               <ScrollView contentContainerStyle={{}} style={styles.eventsScroll}>
                 
                    {events.map(event => {
                        
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
                                navigation={this.props.navigation}
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