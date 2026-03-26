const { Contrat, dbInstance } = require('../models');

const getAllContrats = async (req, res) => {
    const Contrats = await Contrat.findAll();
    res.status(200).json({ Contrats });
};

const getContrat = async (req, res) => {
    const Contrat = await Contrat.findByPk(req.params.id);
    res.status(200).json({ Contrat });
};

const createContrat = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const contrat = await Contrat.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({ contrat });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateContrat = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Contrat.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Contrat successfully updated" });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteContrat = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Contrat.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Contrat successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllContrats, getContrat, createContrat, updateContrat, deleteContrat };