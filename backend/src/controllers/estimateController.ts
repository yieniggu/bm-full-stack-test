import { Request, Response } from "express";
import * as estimateService from "../services/estimateService";

export const getAllEstimates = async (_: Request, res: Response) => {
  const estimates = await estimateService.getAll();
  res.json(estimates);
};

export const getEstimateById = async (req: Request, res: Response) => {
  const estimate = await estimateService.getById(req.params.id);
  if (!estimate) return res.status(404).json({ error: "Estimate not found" });
  res.json(estimate);
};

export const createEstimate = async (req: Request, res: Response) => {
  const newEstimate = await estimateService.create(req.body);
  res.status(201).json(newEstimate);
};

export const updateEstimate = async (req: Request, res: Response) => {
  const updated = await estimateService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Estimate not found" });
  res.json(updated);
};

export const deleteEstimate = async (req: Request, res: Response) => {
  const deleted = await estimateService.remove(req.params.id);
  res.status(204).send();
};
