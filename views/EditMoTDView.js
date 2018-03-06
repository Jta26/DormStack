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
import { Hoshi } from 'react-native-textinput-effects';

export default class EditMoTDView extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        return {
            title: 'Edit MotD',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 30,
                fontFamily: 'Fjalla One',
                
            }
        }
    }
    state = {MotD: ''}

    onEditMessagePress = () => {
        var database = firebase.database();
        var User = this.props.navigation.state.params.User;
        var Dorm = this.props.navigation.state.params.Dorm;
        database.ref('school/' + User.school + '/' + Dorm.key + '/motd').set(this.state.MotD).then(() => {
            Dorm.motd = this.state.MotD;
            this.props.navigation.navigate('Dorm', {Dorm: Dorm, User: User});
        });
        
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Enter the New Message of the Day Below.</Text>
                <Hoshi      
                        label={'Enter Dorm Description'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}
                        multiline={true}
                        style={{marginTop:20, width: 300,}}     
                        onChangeText={(dormDesc) => {
                            this.setState({MotD: dormDesc});
                        }}
            
                    />
                <TouchableOpacity style={styles.button} onPress={() => this.onEditMessagePress()}>
                        <Text style={styles.text}>Edit Message</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        
    },    
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 20,
        height: 35,
        width: 200,
    },
})