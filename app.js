const express = require('express');
const app = express();

const port = 3000;

app.get('/', function (req, res) {
    res.status(200).json({
        message: 'it works'
    });
  });
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = app;