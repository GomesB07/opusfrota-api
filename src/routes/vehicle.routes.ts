import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { getAllVehiclesController, registerVehicleController } from "../controllers/vehicle.controller.ts";

const router = Router()


router.post('/vehicle/register', requireAuth, registerVehicleController)
router.get('/vehicles/all', requireAuth, getAllVehiclesController)

export default router