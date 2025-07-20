import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
};

export type CreateClientInput = Omit<Client, "id">;

export const useClients = () =>
  useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get(`/clients`);
      return res.data;
    },
  });

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: CreateClientInput) => {
      const res = await api.post(`/clients`, client);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: Client) => {
      const res = await api.put(`/clients/${client.id}`, client);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
