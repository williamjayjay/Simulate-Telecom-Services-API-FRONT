import { Router } from "express";
import { CreateUsersController } from "../../../../modules/usersModule/useCases/createUsers/CreateUsersController";

const usersRoutes = Router()
const createdUsersController = new CreateUsersController()

usersRoutes.post("/", createdUsersController.handle)

export { usersRoutes }