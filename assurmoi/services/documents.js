const { Document, dbInstance } = require('../models');

const getAllDocuments = async (req, res) => {
    const Documents = await Document.findAll();
    res.status(200).json({ Documents });
};

const getDocument = async (req, res) => {
    const Document = await Document.findByPk(req.params.id);
    res.status(200).json({ Document });
};

const createDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const document = await Document.create(req.body, { transaction });
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
        res.status(200).json({ message: "Document successfully updated" });
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
        res.status(200).json({ message: "Document successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllDocuments, getDocument, createDocument, updateDocument, deleteDocument };