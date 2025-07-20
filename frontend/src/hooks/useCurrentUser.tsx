import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data[0]; // fetch first user
    },
  });
};
