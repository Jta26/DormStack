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
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

//Views
import CreateDorm from './CreateDormView';

//Custom Components
import DormStackItem from '../components/DormStackItem';
import DormStackOptions from '../components/DormStackOptions';

export default class DormStackView extends Component {
  
  state = {
    User: {first: '', last: '', uid: '', school: ''},
    Dorm: {key: '', name: '', desc: '', motd: '', members: [], images: []},
    Dorms: [], 
    loading: false
  }
 
  componentWillMount() {
    //Resets Dorm Array on Load;
    this.setState({Dorm: []});
    //Initializes Firebase Database
    var database = firebase.database();
    //Event Listener for Retrieving User Data
    database.ref('users/' + firebase.auth().currentUser.uid).on('value', snapshot => {
      this.setState({User:{
        first: snapshot.val().firstname,
        last: snapshot.val().lastname,
        school: snapshot.val().campus,
        uid: firebase.auth().currentUser.uid,
      }});
    });
    // Event Listener for retrieving Dorms Data
    database.ref('school/').once('value').then(snapshot => {
      snapshot.child(this.state.User.school).forEach((dorm) => {
        //Fills out the Dorm Object for easy use
        var Dorm = {
          key: dorm.key,
          name: dorm.val().name,
          desc: dorm.val().description,
          motd: dorm.val().motd,
          member:dorm.val().members,
          images:dorm.val().images
        }
        
        var arrDorm = this.state.Dorms.slice();
        arrDorm.push(Dorm);
        this.setState({Dorms: arrDorm});
        this.setState({loading: false});
      });
    });

  }

  render() {

    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.Dormstack}>
          <Text style={styles.title}>Welcome to the DormStack</Text>
          <Text style={styles.title}>{this.state.User.first} {this.state.User.last}</Text>
      
        {this.state.Dorms.map(dorm => {
          return <View style={styles.Dormstackitem}>
                    <DormStackItem navigation={this.props.navigation} Dorm={dorm} User={this.state.User}/>
                </View>
        })}
        
          
        </ScrollView>
        <View style={styles.settings}>
          <DormStackOptions
          navigation={this.props.navigation}
          />
        
        </View>
        <Spinner style={{flex:1}} visible={this.state.loading} />
       
      </View>
      

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    
  },
  Dormstack: {
    marginBottom: 1000,
    alignItems: 'center'

  },
  Dormstackitem: {
    // backgroundColor: '#CDB87D',
    // backgroundColor: '#1C2957',
    borderWidth: 1,
    borderColor: '#000000',
    width: 350,
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    textAlign: 'center',
    fontFamily:'fjallaone',
    marginBottom: 20,
    fontSize: 30,
    color: '#000000',
  },
  settings: {
    marginBottom: 40
  }
});