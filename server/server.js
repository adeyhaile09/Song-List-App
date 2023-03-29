const express = require('express');
const app = express();
const cors = require('cors');
const initRoutes = require('./routes/song.js');
const mongoose = require('mongoose');
require('dotenv').config();

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

mongoose.connect(
  `mongodb+srv://adeyhaile09:dQlF4lHHNHlL6LbE@cluster0.wxugz8o.mongodb.net/songsDb?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
global.__basedir = __dirname;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
initRoutes(app);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to song list application.' });
});

// set port, listen for requests
app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
