import { Router } from "express";
import { getInviteController, inviteFleetController } from "../controllers/inviteFleet.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import requireOwner from "../middlewares/owner.middleware.ts";

const router = Router()


router.post('/fleet/invite', requireAuth, requireOwner, inviteFleetController)
router.get('/invites', requireAuth, getInviteController)

export default router