const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('Welcome to DateLore Auth Backend 🚀');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
