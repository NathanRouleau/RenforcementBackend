const express = require('express');
const { getAllAssures, getAssure, createAssure, updateAssure, deleteAssure } = require('../services/assures');
const router = express.Router();

router.get('/', getAllAssures);
router.get('/:id', getAssure);
router.post('/', createAssure);
router.put('/:id', updateAssure);
router.delete('/:id', deleteAssure);

module.exports = router;