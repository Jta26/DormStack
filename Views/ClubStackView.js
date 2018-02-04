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

//Custom Components
import ClubStackItem from '../components/ClubStackItem';
import ClubStackOptions from '../components/ClubStackOptions';

const ClubStackView = ({navigation}) => {
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.clubstack}>
        <View style={styles.clubstackitem}>
          <ClubStackItem />
        </View>
          
        </ScrollView>
        <View style={styles.settings}>
        
        </View>
       
      </View>

    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
    
  },
  clubstack: {
  
  },
  clubstackitem: {
   
    width: 250,
    borderColor: 'red',
    borderWidth: 3
  },
  settings: {
    marginBottom: 40
  }

});

export default ClubStackView;