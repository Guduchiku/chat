var app=angular.module('myApp',[]);
app.controller('mainController',['$scope',function($scope){
 var socket   = io.connect();
if (document.cookie.split(';').filter((item) => {
     if(item.includes('uname=') == true)
     {
     	username = item.split("=");
     }
    }));
 $scope.send = function(){
  socket.emit('chat message', $scope.message,username[1]);
  $scope.message="";
 }
 socket.on('chat message', function(msg,name){
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(msg));
  document.getElementById("messages").appendChild(li);
 });
}]);