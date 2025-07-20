import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
