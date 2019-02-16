import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '/imports/ui/index';

if(Meteor.isClient){
  Template.login.helpers({
    isFirstRun(){
      return !Session.get("firstRun");
    }
  });
  Template.login.events({
    "submit form": function (e, data, tpl) {
      // check for valid user
      e.preventDefault();
      $("form").fadeOut();
      Session.set("firstRun", true);
    }
  });

}