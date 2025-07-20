import { Estimate } from "../generated/prisma";
import { prisma } from "../prisma/client";

export const getAll = async () =>
  prisma.estimate.findMany({
    include: {
      client: {
        select: { name: true },
      },
    },
  });

export const getById = async (id: string): Promise<Estimate | null> =>
  prisma.estimate.findUnique({ where: { id } });

export const getByClientId = async (clientId: string): Promise<Estimate[]> =>
  prisma.estimate.findMany({ where: { clientId } });

export const create = async (
  data: Omit<
    Estimate,
    "id" | "createdAt" | "updatedAt" | "status" | "totalCost"
  >
) => {
  const client = await prisma.client.findUnique({
    where: { id: data.clientId },
  });

  if (!client) {
    return null;
  }

  const status =
    data.materialsTotal > 0 && data.laborCost > 0 ? "in_progress" : "initiated";

  return prisma.estimate.create({
    data: {
      ...data,
      status,
      totalCost: data.laborCost + data.materialsTotal,
    },
  });
};

export const update = async (
  id: string,
  data: Partial<Estimate>
): Promise<Estimate | null> => {
  const estimate = await prisma.estimate.findUnique({ where: { id } });
  if (!estimate) return null;

  const laborCost = data.laborCost ?? estimate.laborCost;
  const materialsTotal = data.materialsTotal ?? estimate.materialsTotal;

  let newStatus = estimate.status;

  if (estimate.status === "initiated" && materialsTotal > 0 && laborCost > 0) {
    newStatus = "in_progress";
  }

  if (
    estimate.status === "in_progress" &&
    (materialsTotal === 0 || laborCost === 0)
  ) {
    newStatus = "initiated";
  }

  if (data.status === "completed" && estimate.status === "in_progress") {
    newStatus = "completed";
  }

  return prisma.estimate.update({
    where: { id },
    data: {
      ...data,
      status: newStatus,
      totalCost: laborCost + materialsTotal,
    },
  });
};

export const remove = async (id: string) => {
  const existing = await prisma.estimate.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.estimate.delete({ where: { id } });
};
