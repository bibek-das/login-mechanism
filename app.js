const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a new MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/loginDB',
  collection: 'sessions'
});

// Catch errors in the MongoDB session store
store.on('error', function(error) {
  console.error(error);
});

// Configure session middleware
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.use(express.static('public'));

// Set view engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


// Parse request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
