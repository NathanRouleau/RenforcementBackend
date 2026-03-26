const { Role, dbInstance } = require('../models');

const getAllRoles = async (req, res) => {
    const roles = await Role.findAll();
    res.status(200).json({ roles });
};

const getRole = async (req, res) => {
    const role = await Role.findByPk(req.params.id);
    res.status(200).json({ role });
};

const createRole = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const role = await Role.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({ role });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateRole = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Role.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Role successfully updated" });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteRole = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await Role.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "Role successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllRoles, getRole, createRole, updateRole, deleteRole };