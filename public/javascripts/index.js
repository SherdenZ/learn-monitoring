loadUrlAsDom('https://ya.ru', function(err, doc) {
    console.log(err, doc);
});

function loadUrlAsDom(url, cb) {
    loadUrlByProxy(url, function(err, res) {
        if (err) {
            cb(err);
            return;
        }
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, "text/html");
        cb(null, doc);
    });
}

// @see http://learn.javascript.ru/ajax-xmlhttprequest
function loadUrlByProxy(url, cb) {
    var proxyUrl = 'http://localhost:3000/proxy?url=' + encodeURIComponent(url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', proxyUrl, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            cb(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
            cb(null, xhr.responseText);
        }
    }
}
