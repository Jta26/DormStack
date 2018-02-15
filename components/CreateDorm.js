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
import { Hoshi } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-crop-picker';

import DormStackItem from './DormStackItem';
import SelectImage from './SelectImage';

export default class CreateDorm extends Component {

    state = {error: '', loading: false, DormImage: '', DormName: '', DormDesc: '', isImage: false}

    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    onDormCreate = () => {
        this.props.navigation.navigate('DormStack');
    }
    onCreatePress = () => {
        const {DormName, DormDesc} = this.state;
        if (DormName == '') {
            this.setState({error: 'Please Enter a Dorm Name.'});
            return;
        }
        if (DormDesc == '') {
            this.setState({error: 'Please Enter a Description for Your Dorm.'});
            return;
        }

        var user = firebase.auth().currentUser;
        var database = firebase.database();
 
        var DormId = this.uuidv4();
       
        database.ref('users/' + user.uid).once('value').then(function(snapshot) {
            //Parses JSON data and stores it in variable.
            var userDB = JSON.parse(JSON.stringify(snapshot.val()));
            //Creates The Dorm
            database.ref('school/' + userDB.campus + '/' + DormId).set({
                name: DormName,
                description: DormDesc,
            });
            //Sets the creator of the Dorm to role 0 AKA President
            database.ref('school/' + userDB.campus + '/' + DormId + '/members/' + user.uid).set({
                role: 0
            });

            
           
        });
        this.onDormCreate()

    }





        
    render() {
        return(
            <View>
                <Hoshi      
                        label={'Enter Dorm Name'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}     
                        onChangeText={DormName => this.setState({DormName})}
            
                    />
                    <Hoshi      
                        label={'Enter Dorm Description'}
                        borderColor={'black'}
                        labelStyle={{ color: 'black' }}
                        inputStyle={{ color: 'black' }}
                        multiline={true}
                        style={{marginTop:20}}     
                        onChangeText={DormDesc => this.setState({DormDesc})}
            
                    />
                    <SelectImage/>

                    
                    
                   
                    
                <TouchableOpacity   
                style={styles.button}
                onPress={this.onCreatePress.bind(this)}
                >
                    <Text style={styles.text}>Create Dorm</Text>
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
    },
    dormstackitem: {
        // backgroundColor: '#CDB87D',
        backgroundColor: '#1C2957',
       

        
        
      },
});
