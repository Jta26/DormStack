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
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRScanView extends Component {
  onScan(data) {
      alert(JSON.stringify(data));
    // this.props.navigation.goBack();
  }
  
  render() {
    return (
      <QRCodeScanner
        onRead={this.onScan.bind(this)}
        topContent={(
          <View>
              <Text>You are not a part of this Dorm Yet!</Text>
              <Text>You can Join by contacting an RA and getting their QR Code.</Text>
              <Text>Scan it Below</Text>
          </View>
        )}
        bottomContent={(
          <TouchableOpacity>
            <Text>OK. Got it!</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

