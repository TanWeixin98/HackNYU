// $(function () {
//   $('#message-body').on('submit', function(event){
//     alert("HI");
//     event.preventDefault();
//     if(Meteor.isClient){
//       let roomName = Meteor.call('getCurrentRoom', 'testChatRoom');
//       console.log(roomName);
//       Meteor.call('message.create', $('input[name=text-message]').val(), roomName);
//     }
//     $('input[name=text-message]').val("");
//   });
// });
