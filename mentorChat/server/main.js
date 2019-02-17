import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Rooms } from '../imports/db/chatrooms';

Meteor.startup(function(){
    return Rooms.remove({});
});

Meteor.methods({
    'chatroom.create'(room){
        Rooms.insert({name:room});
        return Rooms.find().fetch();
    },
    'message.create'(msg, roomId){
        Rooms.upsert({name: roomId}, {$push: {log: {user: this.userId, body: msg, createdAt: new Date()}}});
        console.log(Rooms.find().fetch()[0].log[0].body);
        return Rooms.find().fetch();
    },
    'getCurrentRoom'(roomId){
        return roomId;
    },
    'chatroom.history'(roomId){
        return Rooms.find({name: roomId}).log;
    }

});

Meteor.publish('rooms', function () {
    return Rooms.find();
});
