const fs = require('fs');
const path = require('path');

// Path to the data file in the functions directory
const dbPath = path.join(__dirname, 'db.json');

// Function to read data from db.json
const readData = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      return {
        users: {},
        predictions: {},
        lockedPredictions: {},
        stats: { totalPredictions: 0, activePlayers: 0 }
      };
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return {
      users: {},
      predictions: {},
      lockedPredictions: {},
      stats: { totalPredictions: 0, activePlayers: 0 }
    };
  }
};

// Function to write data to db.json
const writeData = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Return current data
      const data = readData();
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    } else if (event.httpMethod === 'POST') {
      // Save new data
      const newData = JSON.parse(event.body);
      const success = writeData(newData);

      if (success) {
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: 'Data saved successfully!' })
        };
      } else {
        return {
          statusCode: 500,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'Failed to save data' })
        };
      }
    } else {
      return {
        statusCode: 405,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 