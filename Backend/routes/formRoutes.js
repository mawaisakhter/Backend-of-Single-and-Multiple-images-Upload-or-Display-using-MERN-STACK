const express = require('express');
const { createForm, upload, getForms } = require('../controllers/formController');
const router = express.Router();

router.post('/', upload.fields([
  { name: 'singleImage', maxCount: 1 },
  { name: 'multipleImages', maxCount: 10 },
]), createForm);


router.get('/getform', getForms);

module.exports = router;
