import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Rooms } from '../imports/db/chatrooms';

Meteor.startup(function(){

    Rooms.remove({});

    for(let i = 0; i <7; i++){
        Meteor.call('chatroom.create', i.toString(), function (err, res) {
            console.log(res);
        });
    }
    return;
});


Meteor.methods({
    'chatroom.create'(room) {
        return Rooms.insert(room);
    },
    'message.create'(msg, roomId) {
        return Rooms.update({ _id: roomId }, { $push: { log: { user: this.userId, body: msg, createdAt: new Date() } } });
    },
    'getCurrentRoomName'(roomId) {
        return Session.set("chat_name", Rooms.find({ _id: roomId })[0].name);
    },
    'chatroom.history'(roomId) {
        return Rooms.find({ name: roomId }).log;
    }

});
Meteor.publish('rooms', function () {
    return Rooms.find();
});
