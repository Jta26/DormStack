import React, {Component} from 'react'
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
import firebase from 'firebase';
import StackNavigator from 'react-navigation';
import { Hoshi } from 'react-native-textinput-effects';

import DatePicker from 'react-native-datepicker';

export default class CreateEvent extends Component {

    state = {
        Event: {
            name: '',
            date: Date.now(),
            description: '',
        },
        Dorm: this.props.navigation.state.params.Dorm,
        User: this.props.navigation.state.params.User,
        error: ''
    };
    
    MakeDorm = () => {
        var database = firebase.database();
        if (this.state.Event.name == '') {
            this.setState({error: 'Please Enter an Event Name.'});
            return;
        }
        if (this.state.Event.date <= Date.now()) {
            this.setState({error: 'That Date is already in the Past.'});
            return;
        }
        if (this.state.Event.description == '') {
            this.setState({error: 'Please Enter a Description for Your Event.'});
            return;
        }
        var eventRef = database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/events').push(this.state.Event);
        database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/events/' + eventRef.key + '/going').push({uid: this.state.User.uid});

    }

    render() {
        return(
            <View>
                <Text>Add an Event to {this.state.Dorm.name}</Text>
                <Hoshi      
                        label={'Enter Event Name'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}
                        onChangeText={name => {
                            this.setState({Event: {
                                name: name,
                                date: this.state.Event.date,
                                description: this.state.Event.description
                            }});
                        }}
                    />
                    <Hoshi      
                        label={'Enter Event Description'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}
                        onChangeText={(desc) => {
                            this.setState({Event: {
                                name: this.state.Event.name,
                                date: this.state.Event.data,
                                description: desc
                            }});
                        }}
                    />
                    <DatePicker
                    style={{width: 200}}
                    date={this.state.Event.date}
                    mode="date"
                    placeholder="select date"
                    format="dddd, MMM DD, YYYY"
                    
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={(date) => {this.setState({
                        Event: {
                            name: this.state.Event.name,
                            date: date,
                            description: this.state.Event.description
                        }})}}
                    />
                    <TouchableOpacity onPress={this.MakeDorm.bind(this)}>
                        <Text>Create Event</Text>
                    </TouchableOpacity>
                    <Text>{this.state.error}</Text>

            </View>
        )
    }
}
