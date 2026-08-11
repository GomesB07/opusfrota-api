import Express from "express";
import 'dotenv/config';
import authRoutes from "./routes/auth.routes.ts";
import vehicleRoutes from './routes/vehicle.routes.ts'

const app = Express();
const port = 3000;

app.use(Express.json())
app.use(authRoutes)
app.use(vehicleRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})