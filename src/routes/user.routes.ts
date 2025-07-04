const express = require('express');
const router = express.Router();
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../controllers/user.controller';

// RUTA DE USUARIOS

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/:id', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;