const express = require('express');
const path = require('path');

const port = process.env.PORT || 4000;
var app = express();

const publicPath = path.join(__dirname, '/dist/ecredit');

// Static folders
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/ecredit/index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
