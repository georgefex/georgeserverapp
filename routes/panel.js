var express = require('express');
var router = express.Router();


 router.get('/', function(req, res, next) {
 res.render('panel', { title: 'mclovin server app' });
 });




module.exports = router;