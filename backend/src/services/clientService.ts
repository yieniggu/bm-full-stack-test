import { Client } from "../generated/prisma";
import { prisma } from "../prisma/client";

export const getAll = async (): Promise<Client[]> => {
  return prisma.client.findMany();
};

export const getById = async (id: string): Promise<Client | null> => {
  return prisma.client.findUnique({ where: { id } });
};

export const create = async (
  data: Omit<Client, "id">
): Promise<Client | null> => {
  const { name, email, phone, userId } = data;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return null;
  }

  return prisma.client.create({
    data: {
      name,
      email,
      phone,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const update = async (
  id: string,
  data: Partial<Omit<Client, "id">>
): Promise<Client | null> => {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.client.update({ where: { id }, data });
};

export const remove = async (id: string): Promise<Client | null> => {
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.client.delete({ where: { id } });
};
