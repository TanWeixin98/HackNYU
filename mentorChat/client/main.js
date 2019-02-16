import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  isLoggedIn(){
    return Meteor.user();
  }
});

Template.login.events({
  'click #submit'(event, instance) {
    // increment the counter when button is clicked
    login.update(this._id, {

      $set: { success: true },

    });
  },
});
