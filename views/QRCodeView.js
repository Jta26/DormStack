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

import QRCode from 'react-native-qrcode-svg';

const {width, height} = Dimensions.get('window');

export default class QRScanView extends Component {

  static navigationOptions = ({ navigation }) => {
        return {
            title: 'View QR Codes',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 30,
                fontFamily: 'Fjalla One',       
            }
        }
    }    
    state = {resQR: '', raQR: ''}

    getQRCodes = () => {
        var params = this.props.navigation.state.params;
        var database = firebase.database();
        database.ref('school/' + params.User.school + '/' + params.Dorm.key + '/qr').once('value', (snapshot) => {
            this.setState({
                resQR: snapshot.val().res,
                raQR: snapshot.val().resad
            });
        });
    }


  render() {
      var logoFile = require('../img/logo.png')
    return (
        <View>
            <Text>Select Which Type of Resident You would like to Add Below</Text>
            <Text>Resident</Text>
            <TouchableOpacity>
                <Text>Show QR Code</Text>
            </TouchableOpacity>
            <Text>Resident Advisor</Text>
            <TouchableOpacity>
                <Text>Show QR Code</Text>
            </TouchableOpacity>

            <QRCode
                logo={logoFile}
                value={this.state.resQR}
            />
            <QRCode
                logo={logoFile}
                value={this.state.raQR}
            />
        </View>
    )
  }
}

