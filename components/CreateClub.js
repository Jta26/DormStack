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
  Picker,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { Hoshi } from 'react-native-textinput-effects'


export default class CreateClub extends Component {

    state = {error: '', loading: false, clubType:'', clubName: '', clubDesc: ''}

    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
     
    onCreatePress = () => {
        const {clubType, clubName, clubDesc} = this.state;
        if (clubType == "") {
            this.setState({error: 'Please Select a Club Type.'});
            return;
        }
        if (clubName == '') {
            this.setState({error: 'Please Enter a Club Name.'});
            return;
        }
        if (clubDesc == '') {
            this.setState({error: 'Please Enter a Description for Your Club.'});
            return;
        }

        var user = firebase.auth().currentUser;
        var database = firebase.database();
 
        var clubId = this.uuidv4();
       
        database.ref('users/' + user.uid).once('value').then(function(snapshot) {
            //Parses JSON data and stores it in variable.
            var userDB = JSON.parse(JSON.stringify(snapshot.val()));
            //Creates The Club
            database.ref('school/' + userDB.campus + '/' + clubId).set({
                name: clubName,
                description: clubDesc,
                type: clubType,
                
            });
            //Sets the creator of the club to role 0 AKA President
            database.ref('school/' + userDB.campus + '/' + clubName + '/members/' + user.uid).set({
                role: 0
            });
            alert('club created');
           
        });

    }
    onClubCreate = () => {
        alert('club created');

    }



        
    render() {
        return(
            <View>
                <Picker     
                selectedValue = {this.state.clubType}
                onValueChange = {(itemValue) => this.setState({clubType: itemValue})}
                mode={'dropdown'}>
                    <Picker.Item label="Select Club Type" value=''/> 
                    <Picker.Item label="Academic" value="Academic"/>
                    <Picker.Item label="Recreational" value="Recreational"/>
                    
                </Picker>
                <Hoshi      
                        label={'Enter Club Name'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}     
                        onChangeText={clubName => this.setState({clubName})}
            
                    />
                    <Hoshi      
                        label={'Enter Club Description'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}
                        multiline={true}
                        style={{marginTop:20}}     
                        onChangeText={clubDesc => this.setState({clubDesc})}
            
                    />
                    
                <TouchableOpacity   
                style={styles.button}
                onPress={this.onCreatePress.bind(this)}
                >
                    <Text style={styles.text}>Create Club</Text>
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
    textarea: {
        borderColor: '#000000',
        borderWidth: 1,
        marginTop: 20
    },
    errortext: {
        textAlign: 'center',
        fontFamily: 'fjallaone',
        color: 'red'
    }
});
