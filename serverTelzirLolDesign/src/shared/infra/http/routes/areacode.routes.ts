import { Router } from "express";
import { CreateAreaCodeController } from "../../../../modules/areaCodeModule/useCases/createAreaCode/CreateAreaCodeController";
import { ListAreaCodesController } from "../../../../modules/areaCodeModule/useCases/listAreaCodes/ListAreaCodesController";

const areaCodeRoutes = Router()
const createAreaCodeController = new CreateAreaCodeController()
const listAreaCodesController = new ListAreaCodesController()

areaCodeRoutes.post("/", createAreaCodeController.handle)
areaCodeRoutes.get("/", listAreaCodesController.handle)

export { areaCodeRoutes }