const express = require('express');
const router = express.Router();
import { getAllUsers, getUserFromID, addUser, updateUser, deleteUser } from '../controllers/user.controller';

// RUTA DE USUARIOS

router.get('/', getAllUsers);

router.get('/:id', getUserFromID);

router.post('/:id', addUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;