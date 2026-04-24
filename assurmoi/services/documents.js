const { Document, dbInstance } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const getAllDocuments = async (req, res) => {
    const documents = await Document.findAll();
    res.status(200).json({ documents });
};

const getDocument = async (req, res) => {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json({ document });
};

const createDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        if (!req.file) return res.status(400).json({ message: 'Aucun fichier reçu' });

        const document = await Document.create({
            ...req.body,
            file_path: req.file.path,
            file_name: req.file.originalname,
            mime_type: req.file.mimetype,
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ document });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Document.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Document successfully updated' });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Document.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Document successfully deleted' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllDocuments, getDocument, createDocument, updateDocument, deleteDocument, upload };