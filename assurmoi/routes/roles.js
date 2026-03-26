const express = require('express');
const { getAllRoles, getRole, createRole, updateRole, deleteRole } = require('../services/roles');
const router = express.Router();

router.get('/', getAllRoles);
router.get('/:id', getRole);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;