import React, {Component} from 'react';
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
import StackNavigator from 'react-navigation';

export default class Event extends Component {

    state = {isGoing: this.props.isGoing, goingURL: require('../img/question.png')}

    componentDidMount() {
        if (this.props.isGoing) {
            this.setState({isGoing: true, goingURL: require('../img/verified.png')});
        }
        
    }
    RegisterGoing = () => {
        if (this.state.isGoing) {
            return;
        }
        var database = firebase.database();
        database.ref('school/' + this.props.User.school + '/' + this.props.Dorm.key + '/events/' + this.props.eventKey + '/going').push({
            uid: this.props.User.uid
        });
        this.setState({isGoing: true, goingURL: require('../img/verified.png')});
        alert(this.props.isGoing)
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.eventTitle}>
                    <Text style={styles.eventName}>{this.props.name}</Text>
                    <Text style={styles.eventDate}>{this.props.date}</Text>
                </View>
                <Text style={styles.eventDesc}>{this.props.description}</Text>
                <View style={styles.bodyContainer}>
                <TouchableOpacity style={styles.going} onPress={this.RegisterGoing.bind(this)}>
                        <Text style={{fontFamily: 'Fjalla One', color: '#000000'}}>Going:</Text>
                        <Image style={styles.goingimg} source={this.state.goingURL}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.seeGoing} onPress={() => 
                        this.props.navigation.navigate('MemberList', {User: this.props.User, Dorm: this.props.Dorm, isEvent: true})}>
                        <Text style={styles.goingText}>See Who's Going</Text>
                    </TouchableOpacity>
                    
                </View>
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      
        borderBottomWidth:1,
        borderColor: "#000000",
        
    },
    bodyContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row'
    },
    eventTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10

    },
    eventName: {
        textAlign: 'left',
        color: '#000000',
        fontSize: 20,
        fontFamily: 'Fjalla One',
    },
    eventDate: {
        textAlign: 'right',
        color: '#000000',
        fontSize: 15,
        fontFamily: 'Fjalla One',
    },
    eventDesc: {
        color: '#000000',
        fontFamily: 'Fjalla One',
        fontSize: 15,
        paddingHorizontal: 10,
        paddingBottom: 5
    },
    seeGoing: {
        paddingTop: 10

      
       
    },
    goingimg: {
        width: 30,
        height: 30,
        backgroundColor: '#ffffff',
       
        
        
    },
    goingText: {textAlign: 'right', paddingTop: 20, color: '#000000', fontFamily: 'Fjalla One'}
});