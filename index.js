const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const uploadDir = 'uploads';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

let mobiles = [];

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(uploadDir)); // Serve static files from the uploads folder

app.get('/mobiles', (req, res) => {
  res.json(mobiles);
});

app.post('/mobiles', upload.single('image'), (req, res) => {
  try {
    const { name, price, model } = req.body;
    if (!req.file) {
      return res.status(400).send('Image upload failed');
    }
    const newMobile = {
      id: mobiles.length + 1,
      name,
      price,
      model,
      imageUrl: `/uploads/${req.file.filename}`
    };
    mobiles.push(newMobile);
    res.status(201).send('Mobile added successfully');
  } catch (error) {
    console.error('Error adding mobile:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
