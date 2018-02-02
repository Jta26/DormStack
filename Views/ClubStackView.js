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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

//Custom Components
import ClubStackItem from '../components/ClubStackItem';
import ClubStackOptions from '../components/ClubStackOptions';

const ClubStackView = ({navigation}) => {
    return(

      <View>
        <ClubStackItem/>
        <ClubStackOptions/>
      </View>

    )
}

export default ClubStackView;