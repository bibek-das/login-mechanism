const User = require('../models/user');

exports.viewSignup = (req, res) => {
    try {
        res.render('signup', { title: "signup" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewLogin = (req, res) => {
    try {
        res.render('login', { title: "login" });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  };

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  };

exports.signup = async (req, res) => {
  const { username, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.render('signup', { error: 'Username already exists' });
    } else {
      const newUser = new User({ username, password, name });
      await newUser.save();
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user._id;
      res.redirect('/profile');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.profile = async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      res.render('profile', { title: `Profile-${user.name}`, user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

