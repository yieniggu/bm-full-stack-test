import { Request, Response } from "express";
import * as estimateService from "../services/estimateService";
import {
  estimateSchema,
  updateEstimateSchema,
} from "../schemas/estimateSchema";

export const getAllEstimates = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (typeof clientId === "string") {
      const estimates = await estimateService.getByClientId(clientId);
      return res.json(estimates);
    }

    const estimates = await estimateService.getAll();
    res.json(estimates);
  } catch (error) {
    console.error("Error fetching estimates:", error);
    res.status(500).json({ error: "Failed to fetch estimates" });
  }
};

export const getEstimateById = async (req: Request, res: Response) => {
  try {
    const estimate = await estimateService.getById(req.params.id);
    if (!estimate) return res.status(404).json({ error: "Estimate not found" });
    res.json(estimate);
  } catch (error) {
    console.error("Error fetching estimate:", error);
    res.status(500).json({ error: "Failed to fetch estimate" });
  }
};

export const createEstimate = async (req: Request, res: Response) => {
  try {
    const parsed = estimateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const newEstimate = await estimateService.create(parsed.data);
    if (!newEstimate) {
      return res.status(400).json({ error: "Client does not exist" });
    }

    res.status(201).json(newEstimate);
  } catch (error) {
    console.error("Error creating estimate:", error);
    res.status(500).json({ error: "Failed to create estimate" });
  }
};

export const updateEstimate = async (req: Request, res: Response) => {
  try {
    const parsed = updateEstimateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    const updated = await estimateService.update(req.params.id, parsed.data);
    if (!updated) return res.status(404).json({ error: "Estimate not found" });

    res.json(updated);
  } catch (error) {
    console.error("Error updating estimate:", error);
    res.status(500).json({ error: "Failed to update estimate" });
  }
};

export const deleteEstimate = async (req: Request, res: Response) => {
  try {
    const deleted = await estimateService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Estimate not found" });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting estimate:", error);
    res.status(500).json({ error: "Failed to delete estimate" });
  }
};
