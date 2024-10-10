const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve Login Page
app.get('/egspec/portal/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/login.html'));
});
// Serve User Dashboard
app.get('/egspec/portal/u/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/dashboard.html'));
});


// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('MySQL connected and tables synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
