const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log('existingUser: ', existingUser);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log('hashedPassword: ', hashedPassword);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword
    });
    console.log('newUser: ', newUser);

    await newUser.save();
    console.log('User saved');

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log('user: ', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('validPassword: ', validPassword);

    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET_KEY', { expiresIn: '24h' });
    console.log('token: ', token);

    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

