import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Client } from "./useClients";

export type Estimate = {
  id: string;
  title: string;
  description: string;
  laborCost: number;
  materialsTotal: number;
  totalCost: number;
  status: "initiated" | "in_progress" | "completed";
  clientId: string;
  client?: Client;
  createdAt: string;
  updatedAt: string;
};

export const useEstimates = () =>
  useQuery<Estimate[]>({
    queryKey: ["estimates"],
    queryFn: async () => (await api.get("/estimates")).data,
  });

export const useEstimatesByClient = (clientId: string) =>
  useQuery<Estimate[]>({
    queryKey: ["estimates", clientId],
    queryFn: async () =>
      (await api.get(`/estimates`, { params: { clientId } })).data,
    enabled: !!clientId,
  });

export const useCreateEstimate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      estimate: Omit<
        Estimate,
        "id" | "status" | "totalCost" | "createdAt" | "updatedAt"
      >
    ) => (await api.post("/estimates", estimate)).data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["estimates", variables.clientId],
      });
    },
  });
};

export const useUpdateEstimate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (estimate: Partial<Estimate> & { id: string }) =>
      (await api.put(`/estimates/${estimate.id}`, estimate)).data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["estimates", variables.clientId],
      });
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });
};

export const useDeleteEstimate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; clientId: string }) => {
      await api.delete(`/estimates/${id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["estimates", variables.clientId],
      });
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });
};
