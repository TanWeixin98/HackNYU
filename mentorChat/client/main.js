import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '/imports/ui/index';

if(Meteor.isClient){

  Template.login.events({
    "submit form": function (e, data, tpl) {
      console.log("Submit button was triggered")
    }
  });

}