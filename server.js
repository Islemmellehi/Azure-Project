const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

// SQL Server configuration
const config = {
  user: 'islem',
  password: 'bahabenamor792001.',
  server: 'projectoserve.database.windows.net',
  database: 'MyDB',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

// API endpoint to retrieve data
app.get('/data', async (req, res) => {
    try {
       // Connect to the database
       await sql.connect(config);
 
       // Query the database
       const result = await sql.query('SELECT * FROM My_table');
 
       // Send the data as JSON
       res.json(result.recordset);
    } catch (err) {
       console.error('Error:', err.message);  // Log detailed error message
       res.status(500).send('Internal Server Error');
    } finally {
       // Close the database connection
       await sql.close();
    }
 });
 