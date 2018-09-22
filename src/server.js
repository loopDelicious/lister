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

    const path = '/';

    fs.readdir(path, {
            withFileTypes: true
        },(err, data) => {
        if (err) throw err;
        let formattedData = data.map((fileName) => {
            return path + fileName;
        })

        res.send(JSON.stringify(formattedData));
      });

});

app.post('/child', function(req, res) {

    const path = req.body.parent;
    console.log(typeof(path));
    console.log(path);

    fs.readdir(path, (err, data) => {
        if (err) throw err;
        let formattedData = data.map((fileName) => {
            return path + fileName;
        })

        res.send(JSON.stringify(formattedData));
    })
})

const port = 4800;
app.listen(process.env.PORT || port);
console.log('Express started on port %d ...', process.env.PORT || port);