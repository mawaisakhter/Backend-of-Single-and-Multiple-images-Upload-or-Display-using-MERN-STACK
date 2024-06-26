const Form = require('../models/Form');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const createForm = async (req, res) => {
  try {
    const { name, age } = req.body;
    const singleImage = req.files['singleImage'][0].path;
    const multipleImages = req.files['multipleImages'].map(file => file.path);

    const form = new Form({
      name,
      age,
      singleImage,
      multipleImages,
    });

    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createForm,
  upload,getForms,
};
