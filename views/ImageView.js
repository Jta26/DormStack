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
    TouchableOpacity,
    Dimensions
  } from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import PhotoView from 'react-native-photo-view';

const {width, height} = Dimensions.get('window')

export default class ImageView extends Component {
    static navigationOptions = ({ navigation }) => {

        const {params} = navigation.state;

        return {
            title: 'Image',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 30,
                fontFamily: 'Fjalla One',       
            }
        }
    }  

    render() {
        var image = this.props.navigation.state.params.image;
        return(
            <View style={{width: width, height: height, backgroundColor: '#000000', }}>
                <PhotoView
                    source={image}
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType="fitCenter"
                    onLoad={() => console.log("Image loaded!")}
                    style={{ width: width, height: height}} 
                />
            </View>
           
            
        )
    }

}
