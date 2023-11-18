// log-ingestor.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB (assuming it's running locally)
mongoose.connect('mongodb://127.0.0.1:27017/logestor')

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

// Log Ingestion Endpoint
app.post('/ingest', async (req, res) => {
  const logData = req.body;

  try {
    // Save log to MongoDB
    await Log.create(logData);
    console.log('Log ingested successfully:', logData);
    res.send('Log ingested successfully');
  } catch (error) {
    console.error('Error ingesting log:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Log Ingestor listening at http://localhost:${port}`);
});
