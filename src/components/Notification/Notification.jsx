import React from 'react';
import NotificationStyles from './notification.module.css';

function Notification(props) {
    return (
        <div className = {NotificationStyles.notification}>
            <h1>{props.notificationText}</h1>
        </div>
    )
}

export default Notification
