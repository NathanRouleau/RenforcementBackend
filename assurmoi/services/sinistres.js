const { Sinistre, dbInstance } = require('../models');

const getAllSinistres = async (req, res) => {
    const Sinistres = await Sinistre.findAll();
    res.status(200).json({ Sinistres });
};

const getSinistre = async (req, res) => {
    const Sinistre = await Sinistre.findByPk(req.params.id);
    res.status(200).json({ Sinistre });
};

const createSinistre = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const Sinistre = await Sinistre.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({ Sinistre });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateSinistre = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Sinistre.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Sinistre successfully updated" });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteSinistre = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Sinistre.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Sinistre successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllSinistres, getSinistre, createSinistre, updateSinistre, deleteSinistre };