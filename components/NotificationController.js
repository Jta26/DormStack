import React, {Component} from 'react'
import {
    PushNotificationIOS
} from 'react-native';
import PushNotification from 'react-native-push-notification';


export default class NotificationController extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function(notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
        });
    }
    render() {
        return null
    }
}