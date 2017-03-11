var express = require ('express');
var app = express();

app.get('/', function(request, response) {
  response.send("Hello World. This is a node js application");
});

app.listen(8000, function() {
  console.log("App started - listening on port 8000");
});
