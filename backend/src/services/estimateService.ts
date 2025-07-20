import { Estimate } from "../generated/prisma";
import { prisma } from "../prisma/client";

export const getAll = async (): Promise<Estimate[]> =>
  prisma.estimate.findMany();

export const getById = async (id: string): Promise<Estimate | null> =>
  prisma.estimate.findUnique({ where: { id } });

export const getByClientId = async (clientId: string): Promise<Estimate[]> => {
  return prisma.estimate.findMany({ where: { clientId } });
};

export const create = async (
  data: Omit<Estimate, "id" | "createdAt" | "updatedAt" | "status">
) =>
  prisma.estimate.create({
    data: {
      ...data,
      status: "initiated",
      totalCost: data.laborCost + data.materialsTotal,
    },
  });

export const update = async (id: string, data: Partial<Estimate>) => {
  const estimate = await prisma.estimate.findUnique({ where: { id } });
  if (!estimate) return null;

  let newStatus = estimate.status;

  if (
    estimate.status === "initiated" &&
    data.laborCost !== undefined &&
    data.materialsTotal !== undefined
  ) {
    newStatus = "in_progress";
  }

  if (data.status === "completed" && estimate.status === "in_progress") {
    newStatus = "completed";
  }

  return prisma.estimate.update({
    where: { id },
    data: {
      ...data,
      status: newStatus,
      totalCost:
        data.laborCost !== undefined && data.materialsTotal !== undefined
          ? data.laborCost + data.materialsTotal
          : estimate.totalCost,
    },
  });
};

export const remove = async (id: string) =>
  prisma.estimate.delete({ where: { id } });
