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
import Logout from '../components/Logout';

const ClubStackView = ({navigation}) => {
    return(

      <View>
        <ClubStackItem/>
        <Logout
          navigation = {navigation}
        />
      </View>

    )
}

export default ClubStackView;