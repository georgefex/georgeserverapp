var express = require('express');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mclovin server app' });
});*/

router.get('/', function(req, res, next) {

  res.render('index', { title: 'login' });

});



router.post('/mclovin', function(req,res,next) {
  var usuario = req.body.username;
  var password = req.body.password;
  if(usuario=='admin'){
    if(password=='admin'){
      res.redirect('/panel');
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/')
  }
});

module.exports = router;