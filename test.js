var request = require("request");
var urls = new Array;
var colors = ["red", "white", "blue", "green", "orange", "purple", "pink", "yellow", "grey"];

for (i = 0; i < 50; i++) {
    urls.push("http://localhost:7000/p?color=" + colors[Math.floor(Math.random() * colors.length)] + "&c=c1&m=" + (i+1));
    urls.push("http://localhost:7000/p?color=" + colors[Math.floor(Math.random() * colors.length)] + "&c=c2&m=" + (i+1));
    urls.push("http://localhost:7000/p?color=" + colors[Math.floor(Math.random() * colors.length)] + "&c=c3&m=" + (i+1));
    urls.push("http://localhost:7000/p?color=" + colors[Math.floor(Math.random() * colors.length)] + "&c=c4&m=" + (i+1));
}

for (var i in urls) {
    var url = urls[i];
    var timeout = (i * 100) + 1000;
    callurl(url, timeout);

}

function callurl(url, timeout) {
    setTimeout(function() {
        request(url, function(error, response, body) {
            console.log("URL: " + url + " Reponse: " + body);
        });
    }, timeout);
}
