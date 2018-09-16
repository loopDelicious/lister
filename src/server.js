const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// allow CORS access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/root', function(req, res) {

    fs.readdir('/', (err, data) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
      });

});

app.get('/child', function(req, res) {
    fs.readdir(req.child, (err, data) => {
        if (err) throw err;
        res.send(JSON.stringify(data));
    })
})

const port = 4800;
app.listen(process.env.PORT || port);
console.log('Express started on port %d ...', process.env.PORT || port);