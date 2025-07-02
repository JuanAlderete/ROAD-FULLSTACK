const express = require('express');
const router = express.Router();
const uuidv4 = require("uuid")

// RUTA DE USUARIOS

let users = [
    {
        id: 34,
        name: "Pedro",
        lastname: "Alvarez"
    }
];

router.get('/', (req: any, res: any) => {
    res.status(200).json({ status: 200, body: users })
});

router.get('/:id', (req: any, res: any, next: any) => {
    try {
        const userId = req.params.id;
        res.status(200).send({ status: 200, body: `User ID: ${userId}` });
    } catch (error: any) {
        res.status(404).json({ error: error.message })
        return next(error);
    }
});

router.post('/add', (req: any, res: any, next: any) => {
    try {
        const receivedData = req.body;
        if (receivedData.name && receivedData.name != '') {
            users.push({
                id: generateRandomID(),
                ...receivedData
            })
            res.status(201).json({ status: 201, body: users });
        } else {
            throw new Error("El usuario debe mandar un nombre");
        }
    } catch (error: any) {
        res.status(404).json({ error: error.message });
        return next(error);
    }
});

router.put('/:id', (req: any, res: any) => {
    try {
        const userId = Number(req.params.id);
        if (!userId) {
            throw new Error("El usuario debe mandar un id válido");
        }
        const receivedData = req.body;
        if (!receivedData.name || receivedData.name.trim() === '') {
            throw new Error("El usuario debe mandar un nombre válido");
        }
        let userFound = users.findIndex((user: any) => user.id === userId);
        if (userFound === -1) {
            throw new Error("No se encuentra un usuario con ese id");
        }
        users[userFound] = {
            ...users[userFound],
            name: receivedData.name
        };
        res.status(200).json({
            status: 200,
            message: `Usuario con ID ${userId} actualizado`,
            body: users[userFound]
        });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/:id', (req: any, res: any) => {
    try {
        const userId = Number(req.params.id);
        if (!userId) {
            throw new Error("El usuario debe mandar un ID válido");
        }
        let userFound = users.findIndex((user: any) => user.id === userId);
        if (userFound === -1) {
            throw new Error("No se encuentra un usuario con ese ID");
        }
        const deletedUser = users[userFound];
        users.splice(userFound, 1);
        res.status(200).json({
            status: 200,
            message: `Usuario con ID ${userId} eliminado`,
            body: deletedUser
        });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

function generateRandomID() {
    return Math.floor(Math.random() * 100)
}

module.exports = router;