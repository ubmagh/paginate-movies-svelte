var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    const fs = require('fs')
    res.json( JSON.parse( fs.readFileSync('./var/movies_reduit.json', {encoding:'utf8', flag:'r'}) ) );

});

module.exports = router;

