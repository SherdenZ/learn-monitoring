var express = require('express');
var request = require('request');
var iconv = require('iconv');
var router = express.Router();

var converter = new iconv.Iconv('windows-1251', 'utf8');
router.get('/', function(req, res, next) {
    request.get({
        url: req.query.url,
        encoding: null
    }, function(err, response, body) {
        if (err) {
            res.send('Error: ' + err);
            return;
        }
        body = converter.convert(body).toString();
        res.send(body);
    });
});

module.exports = router;
