import { User } from "../generated/prisma";
import { prisma } from "../prisma/client";

export const getAll = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const getById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};
