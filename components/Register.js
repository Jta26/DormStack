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
    Picker,

} from 'react-native';
import * as firebase from 'firebase';
import { Jiro, Hoshi, Madoka } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Register extends Component {
    
    state = {error: '', campus: '', first:'', last: '', email:'', password: '', passConfirm: '', loading: false};
    
    onRegisterPress = () => {
        this.setState({error: '', loading: true});
        const {first, last, email, password, passConfirm} = this.state;
        if(!first || !last) {
            this.setState({error: 'Please Enter Both First and Last Names', loading: false});
            return;
        }
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
        
        
        const {first, campus, last ,email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
       .then(() => {
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid).set({
                email: user.email,
                campus: campus,
                firstname: first,
                lastname: last,
            });
            this.setState({error: '', loading: false}); 
            this.props.navigation.navigate('DormStack');
        })
       .catch((error) => {
           alert(error);
       });
        
        
        
    }
    render() {
        
        return(
            <View>
                <Picker 
                selectedValue = {this.state.campus}
                onValueChange = {(itemValue) => this.setState({campus: itemValue})}
                mode={'dropdown'}>
                    <Picker.Item label="Select University" value=""/> 
                    <Picker.Item label="University of Pittsburgh" value="University of Pittsburgh"/>
                    <Picker.Item label="University of Pittsburgh at Bradford" value="University of Pittsburgh at Bradford"/>
                    <Picker.Item label="University of Pittsburgh at Greensburg" value="University of Pittsburgh at Greensburg"/>
                    <Picker.Item label="University of Pittsburgh at Titusville" value="University of Pittsburgh at Titusville"/>
                    <Picker.Item label="University of Pittsburgh at Johnstown" value="University of Pittsburgh at Johnstown"/>
                    
                </Picker>
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
                <Spinner style={{flex:1}} visible={this.state.loading} />
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
        height: 35
    },
    text: {
        
        fontSize: 20,
        fontFamily: 'fjallaone',
        color: '#000000'
    },
    picker: {
        borderColor: '#000000',
        borderWidth: 1,
        
    },
    errortext: {
        textAlign: 'center',
        fontFamily: 'fjallaone',
        color: 'red'
    }
});

