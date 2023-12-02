const express = require('express');
const sql = require('mssql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const config = {
  user: 'islem',
  password: 'bahabenamor792001.',
  server: 'projectoserve.database.windows.net',
  database: 'MyDB',
  options: {
    encrypt: true, // For security
  },
};

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Home.html'));
});

// Define a route to retrieve data
app.get('/api/getData', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database
    const result = await sql.query('SELECT * FROM My_table');

    // Send the data as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the database connection
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
