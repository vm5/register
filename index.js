// index.js

import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js'; // Import the connectDB function
import User from './models/user.js'; // Import your Mongoose User model

const app = express();
const port = 3872;

// Connect to MongoDB
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

// Handle form submission to register users
app.post('/register', async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    password,
    address,
    phone,
    bloodGroup,
    gender,
    city,
  } = req.body;

  try {
    // Create a new user instance using your Mongoose User model
    const newUser = new User({
      Firstname: firstname,
      Middlename: middlename,
      Lastname: lastname,
      Email: email,
      Password: password,
      Address: address,
      Phone: phone,
      BloodGroup: bloodGroup,
      Gender: gender,
      City: city,
    });

    // Save the user to the MongoDB collection
    await newUser.save();

    res.send(
      'You have successfully registered for the GRE! You can now login and view your admit card'
    );
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
});

// Handle form submission to login users
app.post('/login', async (req, res) => {
  const { firstname, password } = req.body;

  try {
    // Find user by firstname (assuming firstname is unique in this case)
    const user = await User.findOne({ Firstname: firstname });

    if (!user) {
      return res.send('User not found. Please register first.');
    }

    // Check if passwords match
    if (user.Password !== password) {
      return res.send('Invalid password. Please try again.');
    }

    // If login is successful, render the admit card page
    const admitCardNumber = 'GRE' + Math.floor(100000 + Math.random() * 900000);
    res.render('admitCard.ejs', { user, admitCardNumber });
  } catch (error) {
    res.status(500).send('Error logging in user: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
