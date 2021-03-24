import express, { Router } from "express";
import { validateRequest, requireAuth } from "@jvtickets22/common";
import { create, createValidator } from "./workspace/create";
import { update, updateValidator } from "./workspace/update";
import { listById } from "./workspace/listById";
import { listTickets } from "./workspace/list";

const router: Router = express.Router();

router.post("/tickets", requireAuth, createValidator, validateRequest, create);
router.get("/tickets", listTickets);
router.get("/tickets/:ticketId", listById);
router.put("/tickets", requireAuth, updateValidator, validateRequest, update);

export default router;
