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
  Picker,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { Hoshi } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

export default class SelectImage extends Component {
    
    state = {DormImageBase64: '', isImage: false}

    TakePhoto = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({DormImageBase64: image.data, isImage: true});
         
            this.props.stateDormImageJSON({DormImageJSON: JSON.stringify(image)});
        });

    }
    PickImage = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({DormImageBase64: image.data, isImage: true});
            this.props.stateDormImageJSON({DormImageJSON: JSON.stringify(image)});
        });
    }

    renderImage = () => {
        if (!this.state.isImage) {
            return (
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.TakePhoto.bind(this)}>
                    <Text style={styles.text}>Take Photo</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Or</Text>
                    <TouchableOpacity style={styles.button} onPress={this.PickImage.bind(this)}> 
                    <Text style={styles.text}>Select Image</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center'}}>You should probably just take a selfie anyways.</Text>
                </View>
            );  
        }
        else {
            return (
                <View style={{alignItems: 'center'}}>
                    
                    <Text style={styles.text}>Selected Image</Text>
                    <TouchableOpacity onPress={() => {this.setState({isImage: false}); this.props.stateDormImageJSON({DormImageJSON: ''})}}>
                        <Image style={{width: 100, height: 100, marginTop: 10, borderWidth: 4, borderColor: '#000000'}} source={{uri: 'data:image/jpg;base64,' + this.state.DormImageBase64}}></Image>
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center'}}>Click it to choose another.</Text>
                </View>
            );
        }
    }
    render() {
        return(
            <View style={styles.container}>
                
                {this.renderImage()}

                
                    
            </View>


        )
    }



}


const styles = StyleSheet.create({

    container: {
        marginTop: 20,
    },
    button: {
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        
        
        height: 35
    },
    text: {
        
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        color: '#000000'
    },
    picker: {
        borderColor: '#000000',
        borderWidth: 1,
        
    },

    
});