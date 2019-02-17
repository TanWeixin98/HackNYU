import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Rooms } from '../imports/db/chatrooms';

Meteor.startup(function(){
    return Rooms.remove({});
});


Meteor.methods({
    'chatroom.create'(room) {
        return Rooms.insert(room);
    },
    'message.create'(msg, roomId) {
        return Rooms.update({ name: roomId }, { $push: { log: { user: this.userId, body: msg, createdAt: new Date() } } });
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
