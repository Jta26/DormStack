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
import Spinner from 'react-native-loading-spinner-overlay'
import SelectImage from '../components/SelectImage';
import Title from '../components/Title';

export default class AddDormImageView extends Component {
    //Props
    //Dorm
    
    state = {
        UserImage: {
            DormImageJSON: ''
        },
        error: '',
        loading: false,
        Dorm: this.props.navigation.state.params.Dorm,
        User: this.props.navigation.state.params.User
    }
    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    AddDormImage = () => {
        if (this.state.UserImage.DormImageJSON == '') {
            this.setState({error: 'Please Select an Image'});
            return;
        }
        this.setState({loading: true})
        var storage = firebase.storage();
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
    
        var image = JSON.parse(this.state.UserImage.DormImageJSON);
        
        var imagePath = image.path;
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
        this.setState({loading: false});
        this.props.navigation.navigate('Dorm', {navigation: this.props.navigation, Dorm: this.state.Dorm, User: this.state.User});
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Add an Image to {this.state.Dorm.name}</Text>
                <View style={styles.selectImage}>
                    <SelectImage
                        stateDormImageJSON={dormImageJSON => {
                            this.setState({UserImage: dormImageJSON});
                        }}
                    />
                
                    <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.AddDormImage.bind(this)}
                    disabled={this.state.loading}
                    activeOpacity={this.state.loading ? 1 : 0.2}
                    >
                        <Text style={styles.text}>Add Image</Text>
                    </TouchableOpacity>
                    <Text style={styles.errortext}>{this.state.error}</Text>
                    <Spinner style={{flex:1}} visible={this.state.loading} />
                </View>
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
    selectImage: {
        width: 300
    },
    title: {
        textAlign: 'center',
        fontFamily:'Fjalla One',
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
        marginTop: 20,
        padding: 20,
        height: 35
    },
    text: {
        color: '#000000',
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        width: 150
    },
    errortext: {
        color: 'red',
        fontFamily: 'Fjalla One',
        textAlign: 'center'
    }


});