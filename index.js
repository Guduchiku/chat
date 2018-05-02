var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(__dirname + '/public'));

app.post('/chat', function(req, res){
	var username = req.body.uname;
	res.cookie('uname', username);
	console.log(username);
  res.render('chat.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg,name){
    io.emit('chat message',name +": " +msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.get('/', function(req, res){
   res.render('index.html');
});

app.set('view engine', 'html');



app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

http.listen(8006, function(){
  console.log('listening on *:3000');
});

// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.use(express.static(__dirname + '/public'));

// app.get('/chat', function(req, res){
//   res.sendfile('public/views/chat.html');
// });

// io.on('connection', function(socket){
//   console.log('user connected');
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
// http.listen(8006, function(){
//   console.log('listening on *:3000');
// });