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

Accounts.createUser({username:"wei",password:"tan"});
Accounts.createUser({username:"wei2",password:"tan"});
Accounts.createUser({username:"wei1",password:"tan"});
Accounts.createUser({username:"wei3",password:"tan"});
Accounts.createUser({username:"wei4",password:"tan"});

  

  Template.login.events({
    "submit form": function (e, data, tpl) {
      // check for valid user
      e.preventDefault();
      var userName = $('[id=inputUser]').val();
      var password = $('[id=inputPassword]').val();
      Meteor.loginWithPassword(userName, password, function (error) {
      if (error)
          window.alert("Wrong Password of User Name!");
      else {
        $("form").fadeOut();

      Session.set("firstRun", true);
      }
      });
    }
  });

}
