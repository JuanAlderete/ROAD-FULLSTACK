import { Request, Response } from 'express';

let users = [
    {
        id: 34,
        name: "Pedro",
        lastname: "Alvarez"
    }
];

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).json({ status: 200, body: users })
}

export const getUserFromID = (req: Request, res: Response) => {
    const userId = req.params.id;
    res.status(200).send({ status: 200, body: `User ID: ${userId}` });
}

export const addUser = (req: Request, res: Response) => {
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
}

export const updateUser = (req: Request, res: Response) => {
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
};

export const deleteUser = (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: "El ID es inválido" });
    }
    let userFound = users.findIndex((user: any) => user.id === userId);
    if (userFound === -1) {
        return res.status(204).json({ error: "El ID es inválido" });
    }
    const deletedUser = users[userFound];
    users.splice(userFound, 1);
    res.status(200).json({
        status: 200,
        message: `Usuario con ID ${userId} eliminado`,
        body: deletedUser
    });
};

function generateRandomID() {
    return Math.floor(Math.random() * 100)
}