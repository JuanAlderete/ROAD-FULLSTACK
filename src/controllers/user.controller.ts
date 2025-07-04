import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }
  const newUser = await userService.createUser(name);
  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const updatedUser = await userService.updateUser(id, name);
  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  await userService.deleteUser(id);
  res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` });
};