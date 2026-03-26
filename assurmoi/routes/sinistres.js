const express = require('express');
const { getAllSinistres, getSinistre, createSinistre, updateSinistre, deleteSinistre } = require('../services/sinistres');
const router = express.Router();

router.get('/', getAllSinistres);
router.get('/:id', getSinistre);
router.post('/', createSinistre);
router.put('/:id', updateSinistre);
router.delete('/:id', deleteSinistre);

module.exports = router;