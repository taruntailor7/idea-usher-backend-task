const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send("Welcome to Idea Usher Backend Task");
})
app.use('/api/posts', postRoutes); // Mount post routes

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));
