const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
