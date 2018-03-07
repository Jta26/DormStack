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
import Spinner from 'react-native-loading-spinner-overlay';
import PushNotification from 'react-native-push-notification';

//Views
import CreateDorm from './CreateDormView';

//Custom Components
import DormStackItem from '../components/DormStackItem';
import DormStackOptions from '../components/DormStackOptions';

const {width, height} = Dimensions.get('window');

export default class DormStackView extends Component {
  
  state = {
    User: {first: '', last: '', uid: '', school: '', profilepic: '' },
    Dorm: {key: '', name: '', desc: '', motd: '', members: [], images: []},
    Dorms: [], 
    DormsJoined: [],
    loading: false
  }
 
  componentDidMount() {
    PushNotification.configure({
      onNotification: () => {
        alert('notify');
      }
    });

    this.setState({loading: true});
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
        profilepic: snapshot.val().profilepic
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
          members:dorm.val().members,
          images:dorm.val().images
        }
       
        
        var arrDorm = this.state.Dorms.slice();
        arrDorm.push(Dorm);
        this.setState({Dorms: arrDorm});
        this.setState({loading: false});
      });
    });
    this.setState({loading: false});
  }

  render() {

    return(
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Welcome to the DormStack</Text>
          
        </View>
        <ScrollView style={{height: height * .75}} contentContainerStyle={styles.Dormstack}>
      
        {this.state.Dorms.map(dorm => {
          return <View style={styles.Dormstackitem}>
                    <DormStackItem navigation={this.props.navigation} Dorm={dorm} User={this.state.User}/>
                </View>
        })}
        </ScrollView>
        <View style={styles.settings}>
          <Button title={'test'} onPress={() => {
            alert('test');
            PushNotification.localNotificationSchedule({
              message: "My Notification Message", // (required)
              date: new Date(Date.now() + (1 * 1000)) // in 60 secs
            });
          }}/>
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
  titlecontainer: {
    height: height * .1,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 1.00,
  },
  title: {
    textAlign: 'center',
    fontFamily:'Fjalla One',
    fontSize: 30,
    marginTop: 20,
    color: '#000000',
    
  },
  titlename: {
    textAlign: 'center',
    fontFamily:'Fjalla One',
    fontSize: 25,
    color: '#000000',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  settings: {
    backgroundColor: '#ffffff',
    elevation: 5,
    height: height * .15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1.00,
  }
});