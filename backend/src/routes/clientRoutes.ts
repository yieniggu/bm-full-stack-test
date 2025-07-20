import { Router } from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

const router = Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
