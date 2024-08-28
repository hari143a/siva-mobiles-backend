// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

let mobiles = [];

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get all mobiles
app.get('/mobiles', (req, res) => {
  res.json(mobiles);
});

// Endpoint to add a new mobile
app.post('/mobiles', (req, res) => {
  const newMobile = req.body;
  newMobile.id = mobiles.length + 1; // Simple ID assignment
  mobiles.push(newMobile);
  res.status(201).send('Mobile added successfully');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
