import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';
import Logout from './Logout';

//Views
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';

export default class Login extends Component {
    state = {email: '', password: '', error: '', loading: false};
    
    componentWillMount() {
        this.setState({loading: true})
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loading: false});
                this.props.navigation.navigate('DormStack');
                return; 
               }
               else {
                this.setState({loading: false});
               }
        })

    }
    onLoginPress = () => {
        
       this.setState({error: '', loading: true});
       
       const { email, password } = this.state;
       var user = firebase.auth().currentUser;
       
       firebase.auth().signInWithEmailAndPassword(email, password)
       .then(() => {
      
            

        })
       .catch((error) => {
           var errMessage = '';
           if (error.message == 'The email address is badly formatted.'){
               errMessage = 'Please Enter a Valid Email';
           }
           else if (error.message == 'The password is invalid or the user does not have a password.') {
               errMessage = 'Password is Incorrect';
           }
           else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                errMessage = 'User Not Found';                   
           }
           this.setState({ error: errMessage, loading: false});
        
       });
    };
    onRegisterPress = () => {
        this.props.navigation.navigate('Register');
    }
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
                    <Spinner style={{flex:1}} visible={this.state.loading} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onRegisterPress.bind(this)}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>
                
        );
    }
    
};

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