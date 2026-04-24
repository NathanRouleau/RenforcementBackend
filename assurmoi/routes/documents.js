const express = require('express');
const { getAllDocuments, getDocument, createDocument, updateDocument, deleteDocument, upload } = require('../services/documents');
const router = express.Router();

router.get('/', getAllDocuments);
router.get('/:id', getDocument);
router.post('/', upload.single('file'), createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;