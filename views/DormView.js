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
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";     

import HorizontalPhotoScroll from '../components/HorizontalPhotoScroll';
import Title from '../components/Title';
import Motd from '../components/Motd';
import EventScroll from '../components/EventScroll';
import Member from '../components/Member';



const {height, width} = Dimensions.get('window');

export default class DormView extends Component {
    //Goals for this class
    //1. Verify whether or not the User is a member of this Dorm
    //2. If they are, display the Dorm information in the form of other react components; I.E. Events; PictureSlider; MoTD; Title;
    //3. If they are not display information of the User that is Role 0 (The Resident Advisor);
    //4. The Non Verified page will display a button to join, which will forward them to another View with the Dorm and User Object as a prop.

    state = {
        Dorm: this.props.navigation.state.params.Dorm,
        User: this.props.navigation.state.params.User,
        isValidated: false,
        Role: false,
        loading: false,
        RAs: [],
        modalIsVisible: false
    }

    static navigationOptions = ({ navigation }) => {
        const {params} = navigation.state;
        return {
            title: params.Dorm.name,
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 30,
                fontFamily: 'Fjalla One',       
            },
            headerRight: (
                params.contextVisible &&
                <TouchableOpacity style={{marginRight: 20}} onPress={params.ToggleModal}>
                    <Image style={{width: 40, height: 40}} source={require('../img/dots.png')}/>
                </TouchableOpacity>

            )
        }
    }   
    componentWillMount() {
        this.setState({loading: true});

        this.GetRAs();
       var database = firebase.database();
       database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/members')
       .once('value', (snapshot => {
            snapshot.forEach((member) => {    
                if (this.CheckMembership(this.state.User, member.val().uid)) {
                    this.setState({isValidated: true});
                    this.props.navigation.setParams({contextVisible: this.state.isValidated, ToggleModal: this.ToggleModal.bind(this)});
                    if (member.val().role == 0) {
                        this.setState({ Role: true});
                        alert(this.state.Role);
                    }
                }  
            });
            this.setState({loading: false})
       }));
    }
    ToggleModal = () => {
        this.setState({modalIsVisible: true});
    }

    CheckMembership = (User, uid) => {
        if (User.uid == uid) {
            return true;
        }
        else {
            return false
        }
    }
    GetRAs = () => {
        var database = firebase.database();
        database.ref('school/' + this.state.User.school + '/' + this.state.Dorm.key + '/members')
        .once('value', snapshot => {
            snapshot.forEach(member => {
                if (member.val().role == 0) {
                        var arrRA = this.state.RAs.slice();
                        arrRA.push(member.val().uid);
                        this.setState({RAs: arrRA});
                }
            });
        })
    }
    RAOptions = () => {
        if (this.state.Role) {
            return(
                <View>
                    <TouchableOpacity style={styles.modalButton} onPress={() => this.props.navigation.navigate('ChangeMotD')}>
                    <Text style={styles.text}>Edit MotD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => this.props.navigation.navigate('AddMember',
                        {Dorm: this.state.Dorm, User: this.state.User}
                    )}>
                    <Text style={styles.text}>Add Member</Text>
                    </TouchableOpacity>
                </View>
            )

        }
        else {
            return
        }
    }
    onMembershipValidate = () => {
        
        if (this.state.isValidated) {
            return (
                <View>

                    <HorizontalPhotoScroll
                        style={styles.photoScroll}
                        Dorm={this.state.Dorm}
                        User={this.state.User}
                        navigation={this.props.navigation}
                    />
                    <Motd
                        style={styles.Motd}
                        motd={this.state.Dorm.motd}
                    />
                    <EventScroll
                        style={styles.eventScroll}
                        Dorm={this.state.Dorm}
                        User={this.state.User}
                        navigation={this.props.navigation}
                        events={[]}
                    />
                     <Modal 
                        isVisible={this.state.modalIsVisible}
                        onBackButtonPress={() => this.setState({modalIsVisible: false})}
                        onBackdropPress={() => this.setState({modalIsVisible: false})}
                        animationIn="slideInLeft"
                        animationInTiming={1000}
                        animationOut="slideOutLeft"
                        animationOutTiming={1000}
                     >
                        <View style={{ 
                            flex: 1,
                            alignItems: 'center', 

                            justifyContent: 'center', 
                            }}>
                            <TouchableOpacity style={styles.modalButton} 
                                onPress={() => {
                                    this.setState({modalIsVisible: false});
                                    this.props.navigation.navigate('MemberList', {Dorm: this.state.Dorm, User: this.state.User, isEvent: false})
                                    }
                            }>
                                <Text style={styles.text}>View Dorm Members</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} 
                                onPress={() => {
                                    this.setState({modalIsVisible: false});
                                    this.props.navigation.navigate('AddImage', {Dorm: this.state.Dorm, User: this.state.User})
                                    }
                            }>
                                <Text style={styles.text}>Add Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} 
                                onPress={() => {
                                    this.setState({modalIsVisible: false});
                                    this.props.navigation.navigate('CreateEvent', {Dorm: this.state.Dorm, User: this.state.User})
                                    
                                }
                            }>
                                <Text style={styles.text}>Add Event</Text>
                            </TouchableOpacity>
                            {this.RAOptions()}
                        </View>
                    </Modal>
                </View>
            );
        }
        else if (!this.state.isValidated) {
            return(
                <View>
                    <View style={{height: height * .22, borderBottomColor: '#000000', borderBottomWidth: 1}}>
                    <Text style={styles.nonmembertitle}>You are not a part of this Dorm!</Text>
                    <Text style={styles.nonmembertext}>You can Join by contacting an RA and getting their QR Code and scanning it using the button below.</Text>
                    <Text style={styles.nonmembertext}>{this.state.Dorm.name} Resident Advisors</Text>
                    </View>
                   
                    <ScrollView style={{height: height * .5}} contentContainerStyle={styles.RAList}>
                        {this.state.RAs.map(uid => {
                            return(
                                <Member
                                    uid={uid}
                                />
                            )
                        })}
                    </ScrollView>
                    <View style={{alignItems: 'center', height: height * 18}}>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('QRScan')}>
                            <Text style={styles.text}>Scan QR Code</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            )
        }
        else {
            
        }
        
    }
    render() {
        //View Design
        //Title
        //ImgScroller
        //MoTD
        //EventsScroller
        //Options
       
        return(
            <View style={styles.container}>
                    
                {this.onMembershipValidate()}
                <Spinner style={{flex:1}} visible={this.state.loading} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        backgroundColor: '#ffffff',
        
    },
    motd: {
        borderColor: '#000000',
        borderWidth: 3,
        height: height / 6
    },
    photoScroll: {
        
    },
    eventScroll: {
      
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 20,
        height: 35,
        width: 200,
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Fjalla One',
        
    },
    nonmembertitle: {
        marginTop: 10,
        color: '#000000',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Fjalla One',
    },
    nonmembertext: {
        marginTop: 20,
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Fjalla One',   
    },
    RAList: {
        alignItems: 'center',
        paddingTop: 5
    },
    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 20,
        height: 35,
        width: 300,
        marginTop: 20
    }
});