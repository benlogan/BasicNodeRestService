var express = require('express');
var app = express();

var port = process.env.PORT || 1337;

app.get('/dataSearch', function(request, response) {
    //var queryData = url.parse(request.url, true).query;
    //serveJson(queryData.q, response);
    serveJson(response);
});

function serveJson(response) {
  var parsedJSON = require('./data/data.json');
  response.end(JSON.stringify(parsedJSON));
}

app.listen(port, function () {
    console.log('Basic Node REST Server - listening on port ' + port);
});
