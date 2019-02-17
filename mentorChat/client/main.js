import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
import { Rooms } from '../imports/db/chatrooms';

import './main.html';
import '/imports/ui/index';

if(Meteor.isClient){

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
  Meteor.startup(function(){

    $('.chat_list').each(function (i) {
      Meteor.call('chatroom.create', i.toString(), function (err, res) {
        console.log(err, res);
      });
    });
  });

  Template.login.helpers({
    isFirstRun(){
      return !Session.get("firstRun");
    },
    history(){
      console.log(Session.get("history"));
      return Session.get("history");
    },
    chatTitle: Session.get("title")
  });

  Template.past_msg.helpers({

    isEqual(c1, c2) {
      console.log(typeof c1+" "+ c1);
      console.log(c2);
      if(c1.toString().equals(c2)) return true;
      if(!c1 || !c2._id) return false;
      if(c1 === c2._id) return true;
      else return false;
    }
  });

  Template.list.events({
    "click .chat_list": function(e){
      let chatSelection = $(e.currentTarget);
      if (chatSelection.hasClass("active_chat")) return;
      $('.inbox_chat').find('.active_chat').removeClass('active_chat');
      chatSelection.addClass('active_chat');
      let roomIndex = $('.chat_list').index(chatSelection);
      console.log(Rooms.find().fetch());
      Session.set("chat_id", Rooms.find().fetch()[roomIndex]._id);
    }
  })
Accounts.createUser({username:"wei",password:"tan"});
Accounts.createUser({username:"wei2",password:"tan"});
Accounts.createUser({username:"wei1",password:"tan"});
Accounts.createUser({username:"wei3",password:"tan"});
Accounts.createUser({username:"wei4",password:"tan"});



  Template.login.events({
    "submit #login": function (e, data, tpl) {
      // check for valid user
      e.preventDefault();
      var userName = $('[id=inputUser]').val();
      var password = $('[id=inputPassword]').val();
      Meteor.loginWithPassword(userName, password, function (error) {
      if (error)
          window.alert("Wrong Password of User Name!");
      else {
        $("#login-page").fadeOut();
        Session.set("firstRun", true);
      }
      });
    },
    "submit #message-body": function (e, data, tpl) {
      // check for valid user
      e.preventDefault();
      if ($('input[name=text-message]').val()==="") return;
      let roomName = Meteor.apply('getCurrentRoom', ['testChatRoom'], {returnStubValue: true});
      Meteor.call('message.create', $('input[name=text-message]').val(), roomName,function(result){
        Session.set("history", Rooms.find({ name: roomName }).fetch()[0]);
        return;
      });
      $('input[name=text-message]').val("");
    },

    "click #send_btn": function (e, data, tpl) {
      // check for valid user
      e.preventDefault();
      if ($('input[name=text-message]').val()==="") return;
      let roomName = Meteor.apply('getCurrentRoom', ['testChatRoom'], {returnStubValue: true});
      Meteor.call('message.create', $('input[name=text-message]').val(), roomName,function(result){
        Session.set("history", Rooms.find({ name: roomName }).fetch()[0]);
        return;
      });
      $('input[name=text-message]').val("");
    }
  });

  Tracker.autorun(() => {
      Meteor.subscribe('rooms', Session.get('roomId'));
});

}
