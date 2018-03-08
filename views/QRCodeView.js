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
import firebase from 'firebase'
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
    state = {resQR: '', raQR: '', isRA: false, isRes: false, isButtonDown: false}
    componentDidMount() {
        this.getQRCodes();
    }
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
      var logoFile = require('../img/logo2.png')
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Which Type of Resident You would like to Add Below</Text>
            <View style={styles.qrcontainer}>
                {this.state.isButtonDown && this.state.isRA && <QRCode logo={logoFile} size={265} value={this.state.raQR}/>}
                {this.state.isButtonDown && this.state.isRes &&  <QRCode logo={logoFile} size={256} value={this.state.resQR}/>}
            </View>
            <Text style={styles.text}>Resident</Text>
            <TouchableOpacity
            style={styles.button} 
            onPressIn={() => this.setState({isRA: false, isRes: true, isButtonDown: true})}
            onPressOut={() => this.setState({isButtonDown: false})}
            >
            <Text style={styles.text}>Show QR Code</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Resident Advisor</Text>
            <TouchableOpacity 
            style={styles.button} 
            onPressIn={() => this.setState({isRA: true, isRes: false, isButtonDown: true})}
            onPressOut={() => this.setState({isButtonDown: false})}
            >
                <Text style={styles.text}>Show QR Code</Text>
            </TouchableOpacity>

        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        marginBottom: 20,
        height: 35,
        width: 200,
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        
    },
    title: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Fjalla One',
        margin: 20
    },
    qrcontainer: {
        height: height * .4,
    }
});
