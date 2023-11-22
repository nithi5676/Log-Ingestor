# Log System

A simple log system that ingests logs over HTTP and provides a query interface for searching and filtering log data.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Log Ingestor](#log-ingestor)
- [Query Interface](#query-interface)
- [Advanced Features](#advanced-features)
- [Sample Queries](#sample-queries)

## Requirements

- Node.js
- MongoDB (local or cloud-based)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/nithi5676/log-system.git

   cd log-system
     npm install

  Log Ingestor

The log ingestor system allows you to ingest logs in a specified JSON format over HTTP.

    node log-ingestor.js

  By default, the log ingestor runs on port 3000.

  POST http://localhost:3000/logs


  Used  tool Postman to send log data to the ingestor
Content-Type: application/json

{
  "level": "info",
  "message": "Log message content",
  "timestamp": "2023-11-18T12:00:00Z"
  // ...other fields
}
Query Interface

The query interface provides a simple web interface for searching and filtering log data.

    
    node query-interface.js

  
