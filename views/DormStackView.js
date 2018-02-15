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
  
  state = {fname: '', lname: '',email : '', school: '', dorms: []}
 
  componentWillMount() {
    this.setState({dorms: []});
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    database.ref('users/' + user.uid).on('value', snapshot => {
      this.setState({fname: snapshot.val().firstname, lname: snapshot.val().lastname, school: snapshot.val().campus, email: snapshot.val().email });
    });
    database.ref('school/' + this.state.school).once('value', snapshot => {
        snapshot.forEach((child) => {
          child.forEach((childSnap) => {
            dormarr = this.state.dorms;
            dormarr.push(childSnap);
              this.setState({dorms: dormarr});
          });
          
        }) 
    });
  }
  
    //Get Dorms from Database
  render() {

    
      
    

    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.Dormstack}>
          <Text style={styles.title}>Welcome to the DormStack</Text>
          <Text style={styles.title}>{this.state.fname} {this.state.lname}</Text>
        
        {this.state.dorms.map(dorm => {
          
          return <DormStackItem title={dorm.val().name}/>
          
          
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