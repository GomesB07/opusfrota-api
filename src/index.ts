import Express from "express";
import 'dotenv/config';
import authRoutes from "./routes/auth.routes.ts";
import vehicleRoutes from './routes/vehicle.routes.ts'
import inviteFleetRoutes from './routes/inviteFleet.routes.ts'
import fleet from './routes/fleet.routes.ts'

const app = Express();
const port = 3000;

app.use(Express.json())
app.use(authRoutes)
app.use(vehicleRoutes)
app.use(inviteFleetRoutes)
app.use(fleet)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})