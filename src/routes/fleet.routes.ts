import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { getFleetController } from "../controllers/fleet.controller.ts";

const router = Router()

router.post('/fleet/get/:fleetId', requireAuth, getFleetController)

export default router