const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

const HttpServer = http.createServer(app);

HttpServer.listen(3000, '0.0.0.0', () => {
  console.log('Server is running at port 3000.');
});
