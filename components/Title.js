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
                <Text style={styles.title}>{this.props.title}</Text>
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

                
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 4,
        borderBottomWidth: 2,
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