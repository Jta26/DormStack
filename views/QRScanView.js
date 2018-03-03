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

