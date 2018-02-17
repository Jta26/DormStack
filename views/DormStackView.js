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
  
  state = {User: {first: '', last: '', uid: '', school: ''}, Dorms: [], test: ''}
 
  componentWillMount() {
    this.setState({Dorm: []});
    var database = firebase.database();
    database.ref('users/' + firebase.auth().currentUser.uid).once('value').then(snapshot => {
      this.setState({User:{
        first: snapshot.val().firstname,
        last: snapshot.val().lastname,
        school: snapshot.val().campus,
        uid: firebase.auth().currentUser.uid,
      }});
    });
    database.ref('/school/' + this.state.User.school).once('value').then(snapshot => {
  
      snapshot.child(this.state.User.school).forEach((dorm) => {
        var arrDorm = this.state.Dorms.slice();
        arrDorm.push(dorm);
        this.setState({Dorms: arrDorm});
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
                  <DormStackItem image={dorm.val().images[0].url} title={dorm.val().name}/>
                </View>
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