import express from "express";
import {
  getAllEstimates,
  getEstimateById,
  createEstimate,
  updateEstimate,
  deleteEstimate,
} from "../controllers/estimateController";

const router = express.Router();

router.get("/", getAllEstimates);
router.get("/:id", getEstimateById);
router.post("/", createEstimate);
router.put("/:id", updateEstimate);
router.delete("/:id", deleteEstimate);

export default router;
