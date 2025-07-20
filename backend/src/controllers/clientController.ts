import { Request, Response } from "express";
import * as clientService from "../services/clientService";

export const getAllClients = async (_: Request, res: Response) => {
  const clients = await clientService.getAll();
  res.json(clients);
};

export const getClientById = async (req: Request, res: Response) => {
  const client = await clientService.getById(req.params.id);
  if (!client) return res.status(404).json({ error: "Client not found" });
  res.json(client);
};

export const createClient = async (req: Request, res: Response) => {
  const newClient = await clientService.create(req.body);
  res.status(201).json(newClient);
};

export const updateClient = async (req: Request, res: Response) => {
  const updated = await clientService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Client not found" });
  res.json(updated);
};

export const deleteClient = async (req: Request, res: Response) => {
  const deleted = await clientService.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Client not found" });
  res.status(204).send();
};
