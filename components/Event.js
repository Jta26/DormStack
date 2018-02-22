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

    state = {goingURL: require('../img/question.png')}

    componentWillMount() {
        if (this.props.isGoing) {
            this.setState({goingURL: require('../img/verified.png')});
        }
        
    }
    RegisterGoing = () => {
        var database = firebase.database();
        

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
                <TouchableOpacity style={styles.going}>
                        <Text style={{fontFamily: 'fjallaone', color: '#000000'}}>Going:</Text>
                        <Image style={styles.goingimg} source={this.state.goingURL}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.seeGoing}>
                        <Text style={styles.goingText}>See Who's Going</Text>
                    </TouchableOpacity>
                    
                </View>
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderColor: "#000000",
    },
    bodyContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row'
    },
    eventTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5

    },
    eventName: {
        textAlign: 'left',
        color: '#000000',
        fontSize: 20,
        fontFamily: 'fjallaone',
    },
    eventDate: {
        textAlign: 'right',
        color: '#000000',
        fontSize: 15,
        fontFamily: 'fjallaone',
    },
    eventDesc: {
        color: '#000000',
        fontFamily: 'fjallaone',
        fontSize: 15,
        paddingHorizontal: 5,
        paddingBottom: 5
    },
    seeGoing: {
        paddingTop: 10

      
       
    },
    goingimg: {
        width: 30,
        height: 30
    },
    goingText: {textAlign: 'right', paddingTop: 20, color: '#000000', fontFamily: 'fjallaone'}
});