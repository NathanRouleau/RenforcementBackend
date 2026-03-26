const { Dossier, dbInstance } = require('../models');

const getAllDossiers = async (req, res) => {
    const Dossiers = await Dossier.findAll();
    res.status(200).json({ Dossiers });
};

const getDossier = async (req, res) => {
    const Dossier = await Dossier.findByPk(req.params.id);
    res.status(200).json({ Dossier });
};

const createDossier = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const Dossier = await Dossier.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({ Dossier });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateDossier = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Dossier.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Dossier successfully updated" });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteDossier = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Dossier.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Dossier successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllDossiers, getDossier, createDossier, updateDossier, deleteDossier };