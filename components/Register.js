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
    
    state = {error: '', first:'', last: '', email:'', password: '', passConfirm: '', loading: false};
    
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
        var database = firebase.database();
        this.setState({error: '', loading: false});
        alert('Account Created');
        this.props.navigation.navigate('Login');
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
       .then(() => {
            this.setState({error: '', loading: false}); 
            this.props.navigation.navigate('ClubStack')})
       .catch((error) => {
           alert('did not sign in');
       });
        //Sign in User Here and divert to main screen.
        var user = firebase.auth().currentUser
        firebase.database().ref('users/' + user.uid).set({
            email: user.email,
            firstname: first,
            lastname: last,
        });
        
    }
    render() {
        
        return(
            <View>
                <Hoshi      
                        label={'First Name'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}     
                        onChangeText={first => this.setState({first})}
                    />
                    <Hoshi            
                        label={'Last Name'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}     
                        onChangeText={last => this.setState({last})} 
                    />
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
        fontFamily: 'fjallaone',
        color: '#000000'
    },
    errortext: {
        textAlign: 'center',
        fontFamily: 'fjallaone',
        color: 'red'
    }
});

