var path = require('path');
require("electron");

export class NotificationSystem
{
    SendNotification(notification: NotificationItem) {
        new Notification(notification.title, notification);
    }

    BasicNotification: NotificationItem = {
        title: "Basic Notification",
        body: "Short message part"
    };

    ContentImageNotifcation: NotificationItem = {
        title: "Content-Image Notification",
        body: "Short message plus a custom content image",
        icon: path.join(__dirname, '../../resources/notification-circle-blue.png')
    };

}

export interface NotificationItem
{
    title: string,
    body: string,
    icon?: string
}