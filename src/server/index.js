var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
  console.log('hello world');
});

var count = 0;

io.on('connection', function(socket){
  console.log('a user connected');
  count+=1;
  console.log("this is user ",count);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    count-=1;
  });

  socket.on('chat message', function(arg){
    console.log('message: ' + arg.message, arg.member);
    io.emit('chat message', {message: arg.message, member: arg.member});
  });

});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
