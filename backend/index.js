const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const customerRoutes = require('./routes/customerRoutes');
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(helmet());
app.use('/api/customers', customerRoutes);

app.get('/api/v1', (req, res) => {
  res.json({
    project: "React and Express Boilerplate",
    from: "Vanaldito",
  });
});


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
