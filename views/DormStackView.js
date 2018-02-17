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

//Views
import CreateDorm from './CreateDormView';

//Custom Components
import DormStackItem from '../components/DormStackItem';
import DormStackOptions from '../components/DormStackOptions';



export default class DormStackView extends Component {
  
  state = {User: {first: '', last: '', uid: '', school: ''}, Dorms: []}
 
  componentWillMount() {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    alert('test');
    database.ref('users/' + user.uid).once('value').then(snapshot => {
      this.setState({User:{
        first: snapshot.val().firstname,
        last: snapshot.val().lastname,
        school: snapshot.val().campus,
        uid: firebase.auth().currentUser.uid,
      }});
    });
    database.ref('school/' + this.state.school).on('value', snapshot => {
      snapshot.forEach((dorm) => {
        alert(JSON.stringify(dorm));
      })
    });

  }

  render() {

    
      
    

    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.Dormstack}>
          <Text style={styles.title}>Welcome to the DormStack</Text>
          <Text style={styles.title}>{this.state.fname} {this.state.lname}</Text>
        
        {this.state.Dorms.map(Dorm => {
          
          return <DormStackItem title={Dorm.val().name}/>
          
          
        })}
          
          
        </ScrollView>
        <View style={styles.settings}>
          <DormStackOptions
          navigation={this.props.navigation}
          />
        
            </View>
        
       
      </View>
      

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    
  },
  Dormstack: {
  },
  Dormstackitem: {
    // backgroundColor: '#CDB87D',
    backgroundColor: '#1C2957',
    width: 250,
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