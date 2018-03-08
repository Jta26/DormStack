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
    TouchableOpacity,
    Dimensions,
    PushNotificationIOS
} from 'react-native';
import firebase from 'firebase';
import StackNavigator from 'react-navigation';
import { Hoshi } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

import DatePicker from 'react-native-datepicker';
import NotificationController from './NotificationController';

const {width, height} = Dimensions.get('window');

export default class CreateEvent extends Component {

    state = {
        Event: {
            name: '',
            date: '',
            description: '',
            
        },
        Dorm: this.props.navigation.state.params.Dorm,
        User: this.props.navigation.state.params.User,
        error: '',
        loading: false
    };
    
    MakeEvent = () => {
        this.setState({loading: true});
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
        database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/events/' + eventRef.key + '/going').push({uid: this.state.User.uid, role: 0});
        console.log('test');
        this.RegisterNotification();
        this.setState({loading: false});
        this.props.navigation.navigate('Dorm', {navigation: this.props.navigation, Dorm: this.state.Dorm, User: this.state.User})
    }
    RegisterNotification = () => {
        eventMoment = moment(this.state.Event.date, 'llll');
        eventDate = eventMoment.toDate();
        fifteenBefore = eventMoment.subtract(15, 'm').toDate();
        alert(fifteenBefore);
        PushNotification.localNotificationSchedule({
            title: this.state.Event.name + ' Soon',
            message: this.state.Event.name + " in 15 minutes",
            date: fifteenBefore
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <NotificationController/>
                <View style={styles.form}>
                    <Text style={styles.textTitle}>Add an Event to {this.state.Dorm.name}</Text>
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
                        <View style={{justifyContent: 'center', alignItems:'center'}}>
                        <DatePicker
                        style={{width: width - 100, marginTop: 20}}
                        date={this.state.Event.date}
                        mode="datetime"
                        placeholder="Select Date"
                        format="llll"
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        showIcon={false}
                        minDate={new Date()}
                        onDateChange={(date) => {this.setState({
                            Event: {
                                name: this.state.Event.name,
                                date: date,
                                description: this.state.Event.description
                            }})}}
                        customStyles={{
                            dateInput: {
                                borderColor: '#000000',
                                alignItems: 'center'

                            },
                            placeholderText: {
                                color: '#000000',
                                fontFamily: 'Fjalla One',
                                fontSize: 20
                            },
                            dateText: {
                                color: '#000000',
                                fontFamily: 'Fjalla One',
                                fontSize: 20
                            },
                            btnTextText: {
                                fontSize: 1,
                                padding: 0
                            },
                            btnConfirm: {
                                
                                padding: 0,
                                marginRight: 10 
                            },
                            btnTextConfirm: {
                                color: '#000000',
                                fontFamily: 'Fjalla One'
                            },
                            btnCancel: {
                                padding: 0,
                                marginLeft: 10 
                            },
                            btnTextCancel: {
                                color: '#000000',
                                fontFamily: 'Fjalla One'
                            }
                            
                        }}
                        />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.MakeEvent.bind(this)}>
                            <Text style={styles.text}>Create Event</Text>
                        </TouchableOpacity>
                        <Text>{this.state.error}</Text>
                        <Spinner style={{flex:1}} visible={this.state.loading} />
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: width - 100
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
    },
    textTitle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Fjalla One',
    },
    button: {       
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 20,
        height: 35
    },
})