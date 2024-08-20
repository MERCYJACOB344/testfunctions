const { app } = require('@azure/functions');
const { Pool } = require('pg');

// Create a pool of clients to manage connections
const pool = new Pool({
    user: 'dbuser',
    host: 'nestit-337',
    database: 'test',
    password: 'dbuser',
    port: 5432,
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
