var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    request.get({
        url: req.query.url
    }, function(err, response, body) {
        if (err) {
            res.send('Error: ' + err);
            return;
        }
        res.send(body);
    });
});

module.exports = router;
