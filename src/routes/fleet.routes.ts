import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { getFleetAndVehiclesController } from "../controllers/fleet.controller.ts";

const router = Router()

router.get('/fleet-and-vehicles/get/', requireAuth, getFleetAndVehiclesController)

export default router