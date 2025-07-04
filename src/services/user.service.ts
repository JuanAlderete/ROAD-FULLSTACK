import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUser = async (name: string) => {
  return await prisma.user.create({
    data: { name },
  });
};

export const updateUser = async (id: number, name: string) => {
  return await prisma.user.update({
    where: { id },
    data: { name },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};