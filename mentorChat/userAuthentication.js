
Template.register.events({
	'submit form': function(event){
	event.preventDefault();
	var userName = $('[name=userName]').val();
	var password = $('[name=password]').val();
	Accounts.createUser({
		username: userName,
		password: password
		},function(err){
			if(err)
				console.log(err.reason);
			else
				Router.go('frontPage');
			});
		}
});

Template.logout.events({
	'click .logout':function (event){
		event.preventDeafult();
		Meteor.logout();
		Router.go('login');
	}
});

Template.login.events({
	'submit form': function (event){
		event.preventDeafult();
		var userName=$('[name=userName]').val();
		var password=$('[name=passsword]').val();
		Meteor.loginWithPassword(userName, password,function(err){
			if(err)
				console.log("wrong password")
			else
				Router.go('frontPage')});
	}
});
