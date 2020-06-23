const express = require("express");
const Notification = require("./notifications.js")

const app = express();

app.get("/one-user", function(req, res) {
    res.send("1");
    const data = {
        tokenId: "cFzoLAet958:APA91bECeZVhddkWNEnPdusTVCbLoAlLx2DVyfjJylu0JV8qUnzop-qENK0iijOvEKtu5m",
        title: "Message",
        message: "Message"
    }
    Notification.sendPushToOneUser(data);
});

app.get("/topic", function(req, res) {
    res.send("1")
    const data = {
        topic:  req.body.topic,
        title: req.body.title,
        message: req.body.message
    }
    Notification.sendPushToTopic(data);
});

app.get("/subscribe", function(req, res) {
    res.send("1")
    const data = {
        topic:  req.body.topic,
        registrationTokens: req.body.tokens,
    }
    Notification.subcribeToTopic(data);
});

app.get("/unsubscribe", function(req, res) {
    res.send("1")
    const data = {
        topic:  req.body.topic,
        registrationTokens: req.body.tokens,
    }
    Notification.unsubcribeToTopic(data);
});

app.get("/sendpushmanyuser", function(req, res) {
    res.send(req)
    const data = {
        topic:  req.body.tokens,
        title: req.body.title,
        message: req.body.message
    }
    Notification.sendPushToTopic(data);
});

app.get("/status", function(req, res) {
    res.send("running")
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});