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
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';

import SelectImage from '../components/SelectImage';
import Title from '../components/Title';

export default class AddDormImageView extends Component {
    //Props
    //Dorm

    state = {
        UserImage: '',
        error: '',
        Dorm: this.props.navigation.state.params.Dorm,
        User: this.props.navigation.state.params.User
    }
    AddDormImage = () => {
        if (UserImage = '') {
            this.setState({error: 'Please Select an Image'});
            return;
        }
        var storage = firebase.storage();
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
    
        var image = JSON.parse(this.state.UserImage.DormImageJSON);
        
        var imagePath = image.path;
        alert(imagePath);
        var Dorm = this.props.navigation.state.params.Dorm;

        let uploadBlob = null;
        const imageRef = firebase.storage().ref(Dorm.key + '/' + this.uuidv4() + ".jpg");
        let mime = 'image/jpg';
        fs.readFile(imagePath, 'base64')
        .then((data) => {
            return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then((blob) => {
            uploadBlob = blob;
            imageRef.put(blob, {contentType: mime}).then((snapshot) => {
                //Sets path of Image to variable
                var imageUrl = snapshot.ref.fullPath;
                //Create New Dorm in Database
                this.AddDatabaseRef(imageUrl, Dorm);
            });
        });
    }
    AddDatabaseRef = (imageUrl, Dorm) => {
        var database = firebase.database();
        var User = this.props.navigation.state.params.User;
        database.ref('school/' + User.school + '/' + Dorm.key + '/images').push({
            url: imageUrl
        });
        this.props.navigation.navigate('Dorm', {navigation: this.props.navigation, Dorm: this.state.Dorm, User: this.state.User});
    }

    render() {
        return(
            <View>
                <Title
                    title={'Add an Image to Your Dorm!'}
                />
                <SelectImage
                    stateDormImageJSON={dormImageJSON => {
                        this.setState({UserImage: dormImageJSON});
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={this.AddDormImage.bind(this)}>
                    <Text>Add Image</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    createDorm: {
        width: 300
    },
    title: {
        textAlign: 'center',
        fontFamily:'fjallaone',
        marginBottom: 20,
        fontSize: 40,
        color: '#000000',
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


});