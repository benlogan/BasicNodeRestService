var url = require('url'); // just for parsing request
var express = require('express');
var app = express();

var port = process.env.PORT || 1337;

app.get('/transcriptlytics', function(request, response) {
  var queryData = url.parse(request.url, true).query;
  serveJson(queryData.ticker, response);
});

function serveJson(ticker, response) {
  var parsedJSON = require('./data/transcriptlytics.json');

  if(ticker) {
    // all results where ticker matches
    var newArray = parsedJSON.filter(function (el) {
      return el.ticker == ticker;
    });

    // date/time ordered
    newArray.sort(custom_sort);

    // return the filtered/sorted array as JSON
    response.end(JSON.stringify(newArray));
  } else {
    // return all
    response.end(JSON.stringify(parsedJSON));
  }
}

// date ordering sort function
function custom_sort(a, b) {
    return new Date(a.transcript_datetime).getTime() - new Date(b.transcript_datetime).getTime();
}

app.listen(port, function () {
  console.log('Basic Node REST Server - listening on port ' + port);
});
