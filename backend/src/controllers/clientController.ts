import { Request, Response } from "express";
import * as clientService from "../services/clientService";
import { clientSchema, updateClientSchema } from "../schemas/clientSchema";

export const getAllClients = async (_: Request, res: Response) => {
  try {
    const clients = await clientService.getAll();
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await clientService.getById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ error: "Failed to fetch client" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const parsed = clientSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const newClient = await clientService.create(parsed.data);

    if (!newClient) return res.status(400).json({ error: "User not found" });
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ error: "Failed to create client" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const parsed = updateClientSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const existing = await clientService.getById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Client not found" });

    const updated = await clientService.update(req.params.id, parsed.data);
    res.json(updated);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ error: "Failed to update client" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const existing = await clientService.getById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Client not found" });

    const deleted = await clientService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ error: "Failed to delete client" });
  }
};
