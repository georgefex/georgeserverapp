var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/');
var procesos = require('./routes/procesos');
var arbol = require('./routes/arbol');
var ram = require('./routes/ram');
var panel = require('./routes/panel');
var sys = require('sys');
var exec = require('child_process').exec;
var http = require('http');
var fs = require('fs');
var sys = require('util');
var app = express();




server = require('http').createServer(app),
    io = require('socket.io').listen(server),


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/arbol', arbol);
app.use('/ram', ram);
app.use('/procesos', procesos);
app.use('/panel', panel);



var procfs = require('procfs-stats');
var ps = procfs(1);



ps.status(function(err,stat){

    //console.log('my process has done this much io',stat);

})







/*conexion entre el servidor y el cliente*/

//Connect to Socket
io.sockets.on('connection',function(socket){
  //set username

  setInterval(function(){
    var valor = 0;
    /*RAM*/

      var cmd = "gcc /home/george/Desktop/Practica2/ram.c -o /home/george/Desktop/Practica2/ram";

      var child = exec(cmd, function (error, stdout, stderr) {
          if (error !== null) {

              console.log('exec error: ' + error);

          }
      });

      var cmd2 = "/home/george/Desktop/Practica2/ram";
      var child2 = exec(cmd2, function (error, stdout, stderr) {
          if (error !== null) {

              console.log('exec error: ' + error);
          }
      });


      var cmd3 = "dmesg | tail -n 1";
      function execChild(callback){
          var child = exec( cmd3,
              function (error, stdout, stderr)
              {
                  var freeram=stdout.replace('\r\n','').replace('free:','');
                  callback(freeram);
              }
          )
      };
      execChild(function(freeram){
          var memoriatotal =12184280/1024/1024;
          var memorialibre = freeram/1024/1024;
          var memoriausada=  memoriatotal - memorialibre;
          var porcentajememoria = memoriausada*100/memoriatotal;
          io.sockets.emit('pushram',porcentajememoria,memoriausada,memoriatotal);
      });








  },2000);




  /*PROCESOS*/


  /* 0.procesos*/




  socket.on('matarproceso',function(data){
/*
      var archi = "#include  <stdio.h> \n#include  <sys/types.h> \n#include  <signal.h> \n#include  <sys/ipc.h>\n#include  <sys/shm.h> \n#include <stdlib.h>\n void  main(void){\n"
      archi = archi +" kill(" + data + ", SIGINT);" +"\n}"
      fs.writeFile("/home/george/Desktop/Practica1/kill.c", archi, function(err) {
          if(err) {
              return console.log(err);
          }


      });


      var cmd1 = "gcc /home/george/Desktop/Practica1/kill.c -o /home/george/Desktop/Practica1/kill";
      var child = exec(cmd1, function (error, stdout, stderr) {



          if (error !== null) {

              console.log('exec error: ' + error);

          }

      });

      var cmd2 = "/home/george/Desktop/Practica1/kill";
      var child2 = exec(cmd2, function (error, stdout, stderr) {



          if (error !== null) {

              console.log('exec error: ' + error);

          }

      });

      console.log("kill"+data);
  */
  });


  socket.on('disconnect',function(data){
    if(!socket.username) return;
    users.splice(users.indexOf(socket.username),1);

  });

});






server.listen(process.env.PORT || 3001);
console.log('Server Started...');



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
