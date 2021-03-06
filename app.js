const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const articlesController = require('./controllers/articles-controller');

// initialize app
const app = express();
const port = process.env.PORT || 3000;

// mongoose setup
mongoose.connect('mongodb://localhost/nodekb', {
  useMongoClient: true,
});
const db = mongoose.connection;
// check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
})
// check for errors
db.on('error', err => {
  console.log(err);
});

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// start server
app.listen(port, () => {
  console.log('Server started on port', port);
});

// get home route
app.get('/', articlesController.index);
//  article routes
const articleRoutes = require('./routes/article-routes');
app.use('/articles', articleRoutes);



