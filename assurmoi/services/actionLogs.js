const { ActionLog, dbInstance } = require('../models');

const getAllActionLogs = async (req, res) => {
    const actionLogs = await ActionLog.findAll();
    res.status(200).json({ actionLogs });
};

const getActionLog = async (req, res) => {
    const actionLog = await ActionLog.findByPk(req.params.id);
    res.status(200).json({ actionLog });
};

const createActionLog = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const actionLog = await ActionLog.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({ actionLog });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const updateActionLog = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await ActionLog.update(req.body, { where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "ActionLog successfully updated" });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

const deleteActionLog = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        await ActionLog.destroy({ where: { id: req.params.id }, transaction });
        await transaction.commit();
        res.status(200).json({ message: "ActionLog successfully deleted" });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllActionLogs, getActionLog, createActionLog, updateActionLog, deleteActionLog };