const { app } = require('@azure/functions');
const { Pool } = require('pg');

// Create a pool of clients to manage connections
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.http('httpTrigger', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      // Query the database
      const result = await pool.query('SELECT * FROM sst_work_order');
  
      // Send the result as a response
      context.res = {
        status: 200,
        body: result.rows
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: error.message
      };
    }
  }
});
