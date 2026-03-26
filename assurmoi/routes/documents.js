const express = require('express');
const { getAllDocuments, getDocument, createDocument, updateDocument, deleteDocument } = require('../services/documents');
const router = express.Router();

router.get('/', getAllDocuments);
router.get('/:id', getDocument);
router.post('/', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;