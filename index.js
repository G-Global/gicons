var express = require('express');
var app = express();



app.set('port', (process.env.PORT || 5000));

// At the top of your web.js
process.env.PWD = process.cwd()

// Then
app.use(express.static(process.env.PWD));

app.get('/', function(req, res) {
  res.sendFile(process.env.PWD +'/index.html');
});

app.listen(app.get('port'), function(){
    console.log('App Listening on port ', app.get('port'))
});
