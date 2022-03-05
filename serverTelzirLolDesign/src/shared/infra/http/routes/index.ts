import { Router } from "express";
import { areaCodeRoutes } from "./areacode.routes";
import { plansRoutes } from "./plans.routes";
import { usersRoutes } from "./users.routes";

const router = Router()

router.use("/areacode", areaCodeRoutes)
router.use("/plans", plansRoutes)
router.use("/users", usersRoutes)

export { router }
