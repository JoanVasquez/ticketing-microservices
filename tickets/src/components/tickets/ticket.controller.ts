import express, { Router } from "express";
import { validateRequest, requireAuth } from "@jvtickets22/common";
import { create, createValidator } from "./workspace/create";

const router: Router = express.Router();

router.post("/tickets", requireAuth, createValidator, validateRequest, create);

export default router;
