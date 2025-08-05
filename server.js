const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const dbPath = path.join(__dirname, 'db.json');

// Function to read data from db.json
const readData = () => {
  if (!fs.existsSync(dbPath)) {
    return {
      users: {},
      predictions: {},
      lockedPredictions: {},
      stats: { totalPredictions: 0, activePlayers: 0 }
    };
  }
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// Function to write data to db.json
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// API endpoint to get the game data
app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// API endpoint to save the game data
app.post('/api/data', (req, res) => {
  const data = req.body;
  writeData(data);
  res.json({ message: 'Data saved successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 