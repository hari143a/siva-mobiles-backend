const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

let mobiles = [];

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Rename the file
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));  // Serve static files from the uploads folder

// Endpoint to get all mobiles
app.get('/mobiles', (req, res) => {
  res.json(mobiles);
});

// Endpoint to add a new mobile with an image
app.post('/mobiles', upload.single('image'), (req, res) => {
  const { name, price, model } = req.body;
  const newMobile = {
    id: mobiles.length + 1,
    name,
    price,
    model,
    imageUrl: `/uploads/${req.file.filename}`  // Save image URL
  };
  mobiles.push(newMobile);
  res.status(201).send('Mobile added successfully');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
