const express = require('express');
const { getAllContrats, getContrat, createContrat, updateContrat, deleteContrat } = require('../services/contrats');
const router = express.Router();

router.get('/', getAllContrats);
router.get('/:id', getContrat);
router.post('/', createContrat);
router.put('/:id', updateContrat);
router.delete('/:id', deleteContrat);

module.exports = router;