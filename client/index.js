var path = require('path');
var express = require('express');
var app = express();
app.use('/', express.static(path.join(__dirname, '../dist/public')))

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../dist/public', 'index.html'))
})

app.listen(8080, function () {                                      
    console.log('Dev app listening on port 8080!');
});