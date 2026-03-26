const { Assure, dbInstance } = require('../models');

const getAllAssures = async (req, res) => {
    const Assures = await Assure.findAll();
    res.status(200).json({ Assures });
};

const getAssure = async (req, res) => {
    const Assure = await Assure.findByPk(req.params.id);
    res.status(200).json({ Assure });
};

const createAssure = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const Assure = await Assure.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({ Assure });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateAssure = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Assure.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Assure successfully updated" });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteAssure = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Assure.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Assure successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllAssures, getAssure, createAssure, updateAssure, deleteAssure };