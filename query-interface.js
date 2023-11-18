// query-interface.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 4001;

app.use(bodyParser.json());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/logestor.logsdb');
mongoose.connect('mongodb://127.0.0.1:27017/logestor')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Log Schema
const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String
  }
});

// Create Log Model
const Log = mongoose.model('Log', logSchema);

// Query Interface Endpoint
app.get('/search', async (req, res) => {
  const { level, message, resourceId, timestampFrom, timestampTo } = req.query;

  console.log('Received query parameters:', req.query);

  try {
    // Build query object based on provided parameters
    const query = {};
    if (level) query.level = level;
    if (message) query.message = new RegExp(message, 'i'); // Case-insensitive regex search
    if (resourceId) query.resourceId = resourceId;
    if (timestampFrom && timestampTo) {
      query.timestamp = {
        $gte: new Date(timestampFrom),
        $lte: new Date(timestampTo)
      };
    }

    // Execute query
    const filteredLogs = await Log.find(query);
    console.log('Filtered logs:', filteredLogs);

    res.json(filteredLogs);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Internal Server Error');
  }
});
// app.get('/search', async (req, res) => {
//   try {
//     console.log('Received query parameters:', req.query);

//     // Rest of your existing code...

//     console.log('Filtered logs:', filteredLogs);

//     res.json(filteredLogs);
//   } catch (error) {
//     console.error('Error processing request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.listen(port, () => {
  console.log(`Query Interface listening at http://localhost:${port}`);
});
// Inside the GET endpoint handler in query-interface.js
