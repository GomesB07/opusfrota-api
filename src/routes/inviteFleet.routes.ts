import { Router } from "express";
import { acceptInviteController, getInviteController, inviteFleetController } from "../controllers/inviteFleet.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import requireOwner from "../middlewares/owner.middleware.ts";

const router = Router()


router.post('/fleet/invite', requireAuth, requireOwner, inviteFleetController)
router.get('/invites', requireAuth, getInviteController)
router.put('/invite/accept/:inviteId', requireAuth, acceptInviteController)

export default router