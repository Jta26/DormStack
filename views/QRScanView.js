'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import QRCodeScanner from 'react-native-qrcode-scanner';

const {width, height} = Dimensions.get('window');

export default class QRScanView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Scan QR Code',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 30,
            fontFamily: 'Fjalla One',       
        }
    }
}  
  onScan(data) {
      var params = this.props.navigation.state.params;
      var database = firebase.database();
      database.ref('school/' + params.User.school + '/' + params.Dorm.key + '/qr').once('value', (snapshot) => {
        if (data.data == snapshot.val().res) {
            //Add Resident
            this.addResident(params.Dorm, params.User, 1);
        }
        else if (data.data == snapshot.val().resad) {
          this.addResident(params.Dorm, params.User, 0);
        }
        else {
            alert('QR Code Not Recoginized');

        }
      });
    // this.props.navigation.goBack();
  }
  addResident = (Dorm, User, role) => {
    var database = firebase.database();
    database.ref('school/' + User.school + '/' + Dorm.key + '/members').push({
        uid: firebase.auth().currentUser.uid,
        role: role
    }).then(() => {
        this.props.navigation.navigate('Dorm', {User: User, Dorm: Dorm});
    });
  }
  
  render() {
    return (
      <QRCodeScanner
        onRead={this.onScan.bind(this)}
        style={{backgroundColor: '#000000'}}
        topContent={
          <View style={{flex:1, backgroundColor: '#000000'}}>
            <View style={{width: width}}></View>
          </View>
        }
        bottomContent={
          <View style={{flex:1, backgroundColor: '#000000'}}>
          <View style={{width: width}}></View>
        </View>
        
        }
        showMarker={true}
        customMarker={
          <View style={{width: 275, height: 275, borderRadius: 45, borderColor: '#ffffff', borderWidth: 2}}>

          </View>
        }
        fadeIn={true}
        cameraStyle={{height: height - 30}}
      />
    );
  }
}

