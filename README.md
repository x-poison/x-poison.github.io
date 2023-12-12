#A sample website for my Onestore

```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/Bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  userType: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + '/content/shop.html');
  } else {
    res.sendFile(__dirname + '/home.html');
  }
});

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword, email, userType } = req.body;

  if (password !== confirmPassword) {
    return res.send('Passwords do not match.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      userType,
    });
    await newUser.save();

    res.send('User registered successfully.');
  } catch (error) {
OBOBOB    console.error(error);
OBOBOB    res.send('Error registering user.');
OBOBOB  }
OBOBOB});

app.post('/login', async (req, res) => {
  const { loginUsername, loginPassword } = req.body;

  try {
    const user = await User.findOne({ username: loginUsername });

    if (user && await bcrypt.compare(loginPassword, user.password)) {
      req.session.loggedIn = true;
      res.redirect('/');
    } else {
      res.send('Invalid username or password. <a href="/">Back to login</a>');
    }
  } catch (error) {
    console.error(error);
    res.send('Error during login. <a href="/">Back to login</a>');
  }
});
OBOBOB
OBOBOBapp.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
OBOBOB});
```
