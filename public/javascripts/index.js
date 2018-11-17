loadUrlAsDom(
    'https://vk.com/wkview.php?act=show&al=1&from=market&loc=market-12344082&query=%7B%7D&w=product-12344082_2095243%2Fquery',
    function(err, doc) {
        var title = doc.querySelector('.market_item_title').getAttribute('title');
        var viewsText = doc.querySelector('.market_item_stats').lastChild.textContent;
        var views = parseInt(viewsText.split(' ')[0])

        console.log(title, views);
        debugger;
    }
);

function loadUrlAsDom(url, cb) {
    loadUrlByProxy(url, function(err, res) {
        if (err) {
            cb(err);
            return;
        }
        var parser = new DOMParser();
        var doc = parser.parseFromString(res.slice(4), "text/html");
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
