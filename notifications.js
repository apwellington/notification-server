const admin = require("firebase-admin");

function initFirebase() {
    const serviceAccount = require(__dirname + '/key/softpine-paradise-firebase-adminsdk-xbqdf-8b427776b1.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

initFirebase();

function sendPushToOneUser(notification) {
    const message = {
        token: notification.tokenId,
        data: {
            title: notification.title,
            message: notification.message,
        }
    }
    sendMessage(message);
}

function sendPushToManyUser(notification) {
    /*
    registrationTokens = [
        'YOUR_REGISTRATION_TOKEN_1',
        // …
        'YOUR_REGISTRATION_TOKEN_N',
    ];*/

    const message = {
        tokens: notification.registrationTokens,
        data: {
            title: notification.title,
            message: notification.message,
        }

    }
    sendMessageMulticast(message);

}

function sendPushToTopic(notification) {
    const message = {
        topic: notification.topic,
        data: {
            title: notification.title,
            message: notification.message
        }
    }
    sendMessage(message);
}

function subcribeToTopic(subscription) {
    admin.messaging().subscribeToTopic(subscription.registrationTokens, subscription.topic)
        .then(function(response) {
            console.log('Successfully subscribed to topic:', response);
        })
        .catch(function(error) {
            console.log('Error subscribing to topic:', error);
        });
}

function unsubcribeToTopic(subscription) {
    admin.messaging().unsubscribeFromTopic()(subscription.registrationTokens, subscription.topic)
        .then(function(response) {
            console.log('Successfully subscribed to topic:', response);
        })
        .catch(function(error) {
            console.log('Error subscribing to topic:', error);
        });
}



module.exports = { sendPushToOneUser, sendPushToTopic, sendPushToManyUser,subcribeToTopic, unsubcribeToTopic }

function sendMessage(message) {
    admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        })
}

function sendMessageMulticast(message) {
    admin.messaging().sendMulticast(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        })
}