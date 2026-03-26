const express = require('express');
const { getAllDossiers, getDossier, createDossier, updateDossier, deleteDossier } = require('../services/dossiers');
const router = express.Router();

router.get('/', getAllDossiers);
router.get('/:id', getDossier);
router.post('/', createDossier);
router.put('/:id', updateDossier);
router.delete('/:id', deleteDossier);

module.exports = router;