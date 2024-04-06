const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// API route
app.get('/api/v1', (req, res) => {
  res.json({
    project: "React and Express Boilerplate",
    from: "Vanaldito",
  });
});

// All other GET requests not handled before will return the React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test database connection and then start the server
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models with the database
    await sequelize.sync();
    console.log('Database synced!');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`App running in port ${PORT}`);
      console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Start by testing the database connection
testDatabaseConnection();
