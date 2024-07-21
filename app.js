const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require('./routes/taskRoute');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Middleware for handling undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
