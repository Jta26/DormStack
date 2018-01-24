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

//Views
import LoginView from '../Views/LoginView';
import RegisterView from '../Views/RegisterView';


export default class Login extends Component {
    state = {email: '', password: '', error: '', loading: false};
    onLoginPress = () => {
       this.setState({error: '', loading: true});
       const { email, password } = this.state;
       firebase.auth().signInWithEmailAndPassword(email, password)
       .then(() => {this.setState({ error: 'Correct', loading: false})})
       .catch((error) => {
           this.setState({ error: error.code, loading: false});
           
       });
    };
    render() {
        const navigation = this.props.navigation;
        return(
            <View style={styles.container}>      
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onLoginPress  }
                    >
                    <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.errortext}>{this.state.error}</Text>
                    <ActivityIndicator size="large" color="black" animating={this.state.loading}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
                
        );
    }
    
};

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