var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('procesos', { title: 'procesos' });
});

module.exports = router;
/**
 * Created by george on 2/11/16.
 */
