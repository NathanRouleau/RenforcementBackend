const express = require('express');
const { getAllActionLogs, getActionLog, createActionLog, updateActionLog, deleteActionLog } = require('../services/actionLogs');
const router = express.Router();

router.get('/', getAllActionLogs);
router.get('/:id', getActionLog);
router.post('/', createActionLog);
router.put('/:id', updateActionLog);
router.delete('/:id', deleteActionLog);

module.exports = router;