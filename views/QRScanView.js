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
      alert(JSON.stringify(data));
    // this.props.navigation.goBack();
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

