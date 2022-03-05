import { Router } from "express";
import { CreatePlansController } from "../../../../modules/plansModule/useCases/createPlans/CreatePlansController";
import { ListPlansController } from "../../../../modules/plansModule/useCases/listPlans/ListPlansController";

const plansRoutes = Router()
const createdPlansController = new CreatePlansController()
const listPlansController = new ListPlansController()


plansRoutes.post("/", createdPlansController.handle)
plansRoutes.get("/", listPlansController.handle)

export { plansRoutes }