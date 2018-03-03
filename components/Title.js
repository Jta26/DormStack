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
  Dimensions,
  Picker,
  ImageBackground,

} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

const {width, height} = Dimensions.get('window');

export default class Title extends Component {
    
    state = {}

    isDormView() {
        if (this.props.hasPicker) {
            return (
                <View style={styles.optionsPicker}>
                    <ImageBackground
                    style={styles.optionsImage}
                    source={require('../img/dots.png')}>
                        <Picker mode={'dropdown'} style={styles.button}
                            onValueChange={this.selectOption.bind(this)}
                        >
                            <Picker.Item label='Select' value='select'/>
                            <Picker.Item label='Add Image' value='image'/>
                            <Picker.Item label='Add Event' value='event'/>
                            <Picker.Item label='Change MoTD' value='motd'/>
                        </Picker>
                    </ImageBackground>

                </View>
            )
        }
    }

    selectOption = (option) => {
        switch (option) {
            case 'select':
                break;
            case 'image':
                this.props.navigation.navigate('AddImage', {Dorm: this.props.Dorm, User: this.props.User})
                break;
            case 'event':
                this.props.navigation.navigate('CreateEvent', {Dorm: this.props.Dorm, User: this.props.User})
                break;
            case 'motd':
                //TODO Change MoTD Nav
                break;
        }
    }
    ChangePicker = () => {
        if (isRA) {
            return(
                <Picker mode={'dropdown'} style={styles.button}
                                onValueChange={this.selectOption.bind(this)}
                            >
                                <Picker.Item label='Select' value='select'/>
                                <Picker.Item label='View Dorm Members' value='members'/>
                                <Picker.Item label='Contact RA' value='contactRA'/>
                                <Picker.Item label='Add Image' value='image'/>
                                <Picker.Item label='Add Event' value='event'/>
                                <Picker.Item label='Change MoTD' value='motd'/>
                </Picker>
            )
        }
        
    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image style={{width: width - 360, height: width - 360, marginTop: 5}} source={require('../img/back.png')}/>
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                

                
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 1.00,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height * .1
    },
    title: {
        textAlign: 'left',
        marginLeft: 10,
        fontFamily:'fjallaone',
        paddingTop: 10,
        fontSize: 40,
        color: '#000000',
    },
    optionsPicker: {
        width: 40,
        height: 40,
        marginTop: 13,
        marginRight: 10
        
    },
    button: {
        
    },
    optionsImage: {
        width: 40,
        height: 40

    }
    
});