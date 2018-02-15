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


export default class SelectImage extends Component {
    state = {DormImage: '', isImage: true}



    TakePhoto = () => {
        
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({isImage: false, DormImage: image.data});
        });
    }
    PickImage = () => {
        
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({isImage: false, DormImage: image.data});
        });
    }



    test = () => {
        if (this.state.isImage) {
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
                <View>
                    <TouchableOpacity>
                        <Image></Image>
                    </TouchableOpacity>
                    <Text style={styles.text}>Selected Image</Text>
                    <Image style={{width: 65, height: 65, textAlign: 'center'}} source={{uri: 'data:image/jpg;base64,' + this.state.DormImage}}></Image>
                </View>
            );
        }
    }
    render() {
        return(
            <View style={styles.container}>
                
                {this.test()}

                
                    
            </View>


        )
    }



}


const styles = StyleSheet.create({

    container: {
        marginTop: 20,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        
        padding: 20,
        height: 35
    },
    text: {
        
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'fjallaone',
        color: '#000000'
    },
    picker: {
        borderColor: '#000000',
        borderWidth: 1,
        
    },

    
});