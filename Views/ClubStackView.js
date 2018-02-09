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
import CreateClub from './CreateClubView';

//Custom Components
import ClubStackItem from '../components/ClubStackItem';
import ClubStackOptions from '../components/ClubStackOptions';


// const InnerStack = StackNavigator({
//     ClubStack: {
//       screen: 'ClubStackView',
//       navigationOptions: {
//         header: null
//       }
//     },
//     CreateClub: {
//       screen: 'CreateClubView',
//       navigationOptions: {
//         header:null
//       }
//     }
// });



export default class ClubStackView extends Component {
  state = {fname: '', lname: '', }
 
  componentWillMount() {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    database.ref('users/' + user.uid + '/firstname').on('value', snapshot => {
      this.setState({fname: snapshot.val()});
    });
  }

  onPressButtonTest() {
    alert('test');
    this.props.navigation.navigate('CreateClub')
  }
  
    //Get Clubs from Database
    render() {

    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.clubstack}>
          <Text style={styles.title}>Welcome to the ClubStack, {this.state.fname}!</Text>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          <ClubStackItem style={styles.clubstackitem}/>
          
        

          
          
        </ScrollView>
        <View style={styles.settings}>
          <ClubStackOptions
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
  clubstack: {
  },
  clubstackitem: {
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