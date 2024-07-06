require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const w3schools = require('./routes/w3schools');
const freecodecamp = require('./routes/freecodecamp');

const app = express();

// Middleware
app.use(bodyParser.json());

const db =  process.env.MONGO_URL
// const db =  `mongodb://localhost:27017/codementor`
// const db = 'mongodb+srv://usamahafiz8:00BLcHKRJDkKzJEq@cluster0.ru1svjs.mongodb.net/'

if (!db) {
  throw new Error('MONGO_URI is not defined in .env file');
}

mongoose.connect(db, {
  useNewUrlParser: false,
  useUnifiedTopology: false,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/w3schools', w3schools);
app.use('/api/freecodecamp', freecodecamp);

const port = process.env.PORT || 5002; // Use a different port if 5000 is in use
app.listen(port, () => console.log(`Server running on port ${port}`));
