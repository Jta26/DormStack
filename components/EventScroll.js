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
    

    componentDidMount() {
        var Dorm = this.props.Dorm;
        var User = this.props.User;
        var database = firebase.database();
       
        database.ref('school/' + User.school + '/' + Dorm.key + '/events').on('value', snapshot => {
            var arrEvents = [];
            this.setState({events: []});
            snapshot.forEach((event) => {
                var isGoing = false;
                var key = event.key;
                event.child('going').forEach((user) => {
                    if (user.val().uid == User.uid) {
                        isGoing = true;
                    }
                })
                
                var objEvent = {
                    name: event.val().name,
                    date: event.val().date,
                    description: event.val().description,
                    isGoing: isGoing,
                    key: key
                }
                
                arrEvents.push(objEvent);
               
                
            });
            this.setState({events: arrEvents});
            
        });
    

    }
    CheckGoing = (eventKey) => {
        var database = firebase.database();
        var User = this.props.User
        var Dorm = this.props.Dorm
        isGoing = false;
        
        database.ref('school/' + User.school + '/' + Dorm.key + '/events/' + eventKey + '/going').once('value', (snapshot) => {
            snapshot.forEach(user => {
                var value = user.child('uid').val();
                if (value == this.props.User.uid) {
                    isGoing = true;
                }
                else { 

                }
            });
        })
       
    }
    mapEvents() {
        var events = this.state.events;
        console.log(events);
        return events.map(event => {
            console.log('mapped' + JSON.stringify(event));
             return(
                 <Event
                     Dorm={this.props.Dorm}
                     User={this.props.User}
                     eventKey={event.key}
                     name={event.name}
                     date={event.date}
                     description={event.description}
                     isGoing={event.isGoing}
                     navigation={this.props.navigation}
                 />
             );
         })
    }
    
    render() {
        
        
        
        return(
            <View>
            <Text style={styles.eventstitle}>Events:</Text>
               <ScrollView contentContainerStyle={{}} style={styles.eventsScroll}>
                    {this.mapEvents()}
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
        fontFamily: 'Fjalla One',
        paddingTop: 10,
        paddingLeft: 5,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: .3
    },
    eventsScroll: {
        height: height * .49,
        
        
    },

    event: {

    }
})