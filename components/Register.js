import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';


export default class Register extends Component {
    state = {error: '', email:'', password: '', passConfirm: '', loading: false};
    
    onRegisterPress = () => {
        this.setState({error: '', loading: true});
        const {email, password, passConfirm} = this.state;
        if (password != passConfirm) {
            this.setState({error: 'Passwords Do Not Match', loading: false});
            return;
        }
        if(!email) {
            this.setState({error: 'Please Enter an Email', loading: false});
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onAccountCreate.bind(this))
        .catch((error) => {
            this.setState({error: error.message, loading: false});
            return;
        });
    }
    onAccountCreate = () => {
        this.setState({error: '', loading: false})
        alert('Account Created');
        this.props.navigation.navigate('Login');
        
    }
    render() {
        
        return(
            <View>
                <Hoshi
                        label={'Email'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}
                        onChangeText={email => this.setState({ email })}
                    />
                    <Hoshi    
                        secureTextEntry={true}        
                        label={'Password'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}     
                        onChangeText={password => this.setState({ password })}
                    />
                    <Hoshi    
                        secureTextEntry={true}        
                        label={'Confirm Password'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}     
                        onChangeText={passConfirm => this.setState({ passConfirm })}
                    />
                <TouchableOpacity 
                onPress={this.onRegisterPress.bind(this)}   
                style={styles.button}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.errortext}>{this.state.error}</Text>
                <ActivityIndicator size="large" color="black" animating={this.state.loading}/>
            </View>
        );
    }
   
    





}
const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        marginTop: 30,
        padding: 20,
        
        
    },
    text: {
        fontSize: 20,
        color: '#000000'
    },
    errortext: {
        textAlign: 'center',
        color: 'red'
    }
});

