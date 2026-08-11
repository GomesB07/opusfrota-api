import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { requireOwner } from "../middlewares/owner.middleware.ts";
import { registerVehicleController } from "../controllers/vehicle.controller.ts";

const router = Router()


router.post('/vehicle/register', requireAuth, requireOwner, registerVehicleController)

export default router