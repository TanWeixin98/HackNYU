import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Rooms } from '../db'

Meteor.methods({
    'chatroom.create'(room){
        Rooms.insert(room);
    },
    'message.create'(msg, roomId){
        Rooms.update({name: roomId}, {$push: {log: {user: this.userId, body: msg, createdAt: new Date()}});
    },
    'getCurrentRoom'(roomId){
        return roomId;
    },
    'chatroom.history'(roomId){
        return Rooms.find({name: roomId}).sort({createdAt: -1});
    }

});